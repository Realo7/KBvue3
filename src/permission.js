import nProgress from 'nprogress'
import router from '@/router'
import store from '@/store'
import { getAuthCode } from '@/util/dingtalk'
import { Dialog, Notify } from 'vant'
import { bindUserwithDD } from '@/api/user.js'

// 查询该手机号是否绑定用户
function querrybind(mobile, userId) {
  let data = { mobile, appId: userId }
  bindUserwithDD(data)
    .then(res => {
      if (res.code !== 200) {
        // 如果没有
        Dialog.confirm({
          title: '提示',
          message: res.msg,
          confirmButtonText: '前往手动绑定',
          cancelButtonText: '返回联系管理'
        })
          .then(() => {
            // on confirm
            router.push({
              path: '/ddqhbind'
            })
          })
          .catch(() => {
            location.reload()
          })
      } else {
        //如果已经绑定过，把返回的琦航账户的id和username存到vuex和localstorage
        store.state.qhusername = res.result.userName
        localStorage.setItem('userName', res.result.userName)
        store.state.qhid = res.result.id
        localStorage.setItem('qhid', res.result.id)
        router.replace({
          path: '/home'
        })
      }
    })
    .catch(err => {
      Notify(err)
      console.log(err)
    })
}

router.beforeEach(async (to, from) => {
  nProgress.start()

  console.log(to)
  console.log(from)
  if (to.path == '/h5login') {
    //先判断是否dd环境
    getAuthCode(process.env.VUE_APP_CORPID)
      .then(rew => {
        console.log('________________________' + rew)
        //   是钉钉环境
        if (rew) {
          store.state.isInDing = true
          Notify({ type: 'primary', message: '成功进入钉钉环境' })
          store.state.authCode = rew.code
        }
        // 通过钉钉登录的，直接跳转home
        let code = { authCode: '' }
        code.authCode = rew.code
        store
          .dispatch('dduserlogin', code)
          .then(res => {
            console.log(`AccessToken是${res.result.accessToken}`)
            console.log(res)
            store.state.username = res.result.name
            store.state.userid = res.result.userId
            store.state.mobile = res.result.mobile
            store.state.avatar = res.result.avatar
            localStorage.setItem('accessToken', res.result.accessToken)
            console.log(`app.vue里面获取${store}`)
            // 3.然后查询是否绑定qh账号
            querrybind(res.result.mobile, res.result.userid)
          })
          .catch(err => {
            // 说明没有获取到用户信息和accessToken
            Notify({
              message: 'getACCESSTOKEN出现问题' + err,
              duration: 2000
            })
            console.log(err)
            router.replace({
              path: '/h5login'
            })
          })
      })
      .catch(err => {
        console.log(err)
        // 不是钉钉环境的化继续导航到h5login
        return true
      })
  } else if (to.path == '/home' && from.path == '/h5login' && store.state.userId != '') {
    Notify({
      message: '钉钉免密登录成功',
      duration: 2000
    })
  }

  // ...
  // 返回 false 以取消导航
  //   return false
})
