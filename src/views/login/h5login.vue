<template>
  <!--  本页面用于H5登录(使用的是琦航账号) -->
  <div class="content">
    <div style="height:7rem">

    </div>
    <div class="changshi">
      <van-row>
        <van-col span="8">H5登录</van-col>
        <van-col span="8"></van-col>
        <van-col span="8"></van-col>
      </van-row>
    </div>

    <van-form @submit="onSubmit">
      <van-field v-model="state.username"
                 name="用户名"
                 label="用户名"
                 placeholder="用户名"
                 :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="state.password"
                 type="password"
                 name="密码"
                 label="密码"
                 placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="primary"
                    native-type="submit">
          <van-loading v-if="state.showloading" />
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { onMounted, reactive } from 'vue'

import { qhUserLogin } from '@/api/home.js'
import { Notify } from 'vant'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      username: '',
      password: '',
      showloading: false
    })
    const onSubmit = values => {
      state.showloading = true
      console.log('submit', values)
      let fashe = {
        userName: state.username,
        passWord: state.password
      }
      let formdata = new FormData()
      formdata.append('userName', state.username)
      formdata.append('passWord', state.password)
      qhUserLogin(formdata)
        .then(res => {
          if (res.code !== 200) {
            state.username = ''
            state.password = ''
            Notify('登陆失败,请重新登录')
          } else {
            store.state.qhid = res.result.id
            store.state.qhusername = res.result.userName
            store.state.qhroleId = res.result.roleId
            router.push({
              path: '/'
            })
          }
        })
        .catch(err => {
          state.username = ''
          state.password = ''
          state.showloading = false
          Notify('登录失败，请检测网络通信')
          console.log(err)
        })
    }
    onMounted(() => {
      store.state.showtabbar = false
    })
    const querryUser = () => {}

    return {
      state,
      onSubmit
    }
  }
}
</script>
<style scoped>
.content {
  margin: 0.5rem;
}
.changshi {
  text-align: center;
  font-size: 0.6rem;
  margin-bottom: 0.3rem;
}
</style>
