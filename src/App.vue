<template>
  <router-view />
</template>

<script>
import { ref, onBeforeMount, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { getAuthCode } from '@/util/dingtalk'
import { useRouter } from 'vue-router'
import { bindUserwithDD } from '@/api/user.js'
import { Dialog, Notify } from 'vant'
import config from '@/config/index.js'
// @ is an alias to /src

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const router = useRouter()
    const code = reactive({})
    // 钉钉环境登录获取用户信息
    // eslint-disable-next-line no-unused-vars
    const HomegetAuthCode = () => {
      console.log(process.env.NODE_ENV)
      // 1.获取钉钉临时授权码
      getAuthCode(process.env.VUE_APP_CORPID)
        .then(rew => {
          Notify('获取钉钉成功进入钉钉环境' + rew.code)
          console.log(rew)
          // 存入store
          store.state.authCode = rew.code
          code.authCode = rew.code
          // 2.获取钉钉accessToken和用户信息
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
              router.push({
                path: '/h5login'
              })
            })
        })
        .catch(err => {
          // 说明没有进入钉钉环境
          console.log('进入H5虚拟环境')
          // 进入H5的登录界面
          // 测试环境注释掉
          if (store.state.qhid == '' || store.state.qhusername == '') {
            // 生产环境添加
            router.push({
              path: '/h5login'
            })
          } else {
            Notify('未检测到钉钉环境')
          }
        })
    }
    // H5环境获取用户信息(之前需要跑一次钉钉环境获取信息)
    // eslint-disable-next-line no-unused-vars
    const h5GetUser = () => {
      const userId = '28590759431053373'
      const accessToken = '2a95308b8c58337289392c5e4e4052b2'
      const data = { userId, accessToken }
      store
        .dispatch('forceGetUserInfo', data)
        .then(res => {
          // console.log(`强制获取${JSON.stringify(res)}`)
          store.state.username = config.name
          store.state.userid = config.userId
          store.state.mobile = config.mobile
          store.state.avatar = config.avatar
          localStorage.setItem('accessToken', res.result.accessToken)

          querrybind(res.result.mobile, res.result.userid)
          //上线修改
          // querrybind(18068711360, config.userId)
        })
        .catch(err => {
          console.log(err)
        })
    }

    // 查询该手机号是否绑定用户
    const querrybind = (mobile, userId) => {
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
              path: '/'
            })
          }
        })
        .catch(err => {
          Notify(err)
          console.log(err)
        })
    }
    onBeforeMount(() => {
      // 进入APP时获取信息,先检测是否钉钉环境
      HomegetAuthCode()
    })
    onMounted(() => {})

    return { querrybind }
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
