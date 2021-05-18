<template>
  <router-view />
</template>

<script>
import { ref, onBeforeMount, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { getAuthCode } from '@/util/dingtalk'

// @ is an alias to /src

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const code = reactive({})
    // 钉钉环境登录获取用户信息
    // eslint-disable-next-line no-unused-vars
    const HomegetAuthCode = () => {
      console.log(process.env.NODE_ENV)
      // 获取钉钉临时授权码
      console.log(process.env.VUE_APP_CORPID)
      getAuthCode(process.env.VUE_APP_CORPID)
        .then(rew => {
          console.log(rew)
          // 存入store
          store.state.authCode = rew.code
          code.authCode = rew.code
          store
            .dispatch('dduserlogin', code)
            .then(res => {
              console.log(`AccessToken是${res.result.accessToken}`)
              console.log(res)
              store.state.userName = res.result.name
              store.state.userId = res.result.userId
              store.state.mobile = res.result.mobile
              store.state.avatar = res.result.avatar
              localStorage.setItem('accessToken', res.result.accessToken)
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log('进入H5虚拟环境')
          // 如果不是在钉钉环境的化进入H5虚拟环境
          h5GetUser()
        })
    }
    // H5环境获取用户信息(之前需要跑一次钉钉环境获取信息)
    // eslint-disable-next-line no-unused-vars
    const h5GetUser = () => {
      const userId = process.env.VUE_APP_USERID
      const accessToken = process.env.VUE_APP_ACCESSTOKEN
      const data = { userId, accessToken }
      console.log(data)
      store
        .dispatch('forceGetUserInfo', data)
        .then(res => {
          console.log(`强制获取${JSON.stringify(res)}`)
          store.state.userName = res.result.name
          store.state.userId = res.result.userId
          store.state.mobile = res.result.mobile
          store.state.avatar = res.result.avatar
          localStorage.setItem('accessToken', res.result.accessToken)
        })
        .catch(err => {
          console.log(err)
        })
    }

    onBeforeMount(() => {
      // 进入APP时获取信息,先检测是否钉钉环境
      HomegetAuthCode()
    })
    onMounted(() => {})

    return {}
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
