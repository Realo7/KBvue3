<template>

  <!-- 本界面用于绑定钉钉和琦航账号 -->
  <div class="content">
    <van-notice-bar left-icon="volume-o"
                    :text="noticetext" />
    <van-cell title="当前钉钉对应手机号"
              :value="nowmobile" />

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
          绑定
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { reactive, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { updateUserwithDD } from '@/api/user.js'
import { Dialog, Toast } from 'vant'
export default {
  setup() {
    const noticetext = computed(() => {
      return store.state.username + '欢迎登录，请绑定您的琦航账号。'
    })
    const store = useStore()
    const nowmobile = ref(store.state.mobile)
    const state = reactive({
      username: '',
      password: ''
    })
    const onSubmit = values => {
      console.log('submit', values)
      console.log(state.username)
      let fashe = {
        userName: state.username,
        passWord: state.password,
        mobile: store.state.mobile,
        appId: Number(store.state.userid)
      }
      console.log(typeof fashe.appId)
      updateUserwithDD(fashe)
        .then(res => {
          console.log(res)
          if (res.code != '200') {
            Toast.fail(res.res + '请重新输入')
            state.username = ''
            state.password = ''
          } else {
            Dialog.alert({
              title: '提示',
              message: '点击确定返回主页'
            }).then(() => {
              router.push({
                path: '/'
              })
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    const getmyinfo = () => {
      console.log(store.state.username)
      console.log(store.state.mobile)
    }

    onMounted(() => {
      getmyinfo()
    })
    return { nowmobile, noticetext, state, onSubmit }
  }
}
</script>
<style scoped>
.content {
  margin: 1rem 1rem 0 1rem;
}
</style>