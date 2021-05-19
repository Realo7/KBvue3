<template>
  <!--  本页面用于H5登录(使用的是琦航账号) -->
  <div>
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
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      username: '',
      password: ''
    })
    const onSubmit = values => {
      console.log('submit', values)
    }

    const querryUser = () => {}

    return {
      state,
      onSubmit
    }
  }
}
</script>
