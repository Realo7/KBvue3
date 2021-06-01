// import nProgress from 'nprogress'
// import router from '@/router'
// import store from '@/store'
// import { getAuthCode } from '@/util/dingtalk'
// import { Dialog, Notify } from 'vant'

// router.beforeEach(async (to, from) => {
//   nProgress.start()
//   console.log(to)
//   console.log(from)
//   if (to.path == '/h5login') {
//     //先判断是否dd环境
//     getAuthCode(process.env.VUE_APP_CORPID)
//       .then(rew => {
//         //   是钉钉环境
//         store.state.isInDing = true
//         Notify('成功进入钉钉环境')
//         // 存入store
//         store.state.authCode = rew.code
//       })
//       .catch(err => {
//         console.log(err)
//         // 不是钉钉环境的化继续导航到h5login
//         return true
//       })
//   }

//   // ...
//   // 返回 false 以取消导航
//   //   return false
// })
