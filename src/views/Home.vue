<template>
  <div style="margin:100px 15px 0px 15px">
    <van-form @submit="onSubmit">
      <van-field v-for="item in key_value"
                 :key="item.id"
                 v-model="item.value"
                 clickable
                 label="item.key" />
      <van-field v-model="state.value"
                 readonly
                 clickable
                 name="picker"
                 label="申请类型"
                 placeholder="点击选择申请类型"
                 @click="state.showPicker = true" />
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

    <van-popup v-model:show="state.showPicker"
               position="bottom">
      <van-picker :columns="columns"
                  :columns-field-names="customFieldName"
                  @confirm="onConfirm"
                  @cancel="state.showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { queryApprovalProcess, queryTemplateDetails, goTemplate } from '@/api/kaoqin.js'

// @ is an alias to /src

export default {
  name: 'Home',
  setup() {
    let key_value = ref([])
    let columns = ref([])
    const picker = ref(null)
    const customFieldName = {
      text: 'name'
    }
    const state = reactive({
      username: '',
      password: ''
    })
    const onConfirm = value => {
      console.log(`1-----${value}`)
      console.log(`2-----${value.name}`)
      state.value = value.name
      state.showPicker = false
    }
    const onSubmit = values => {
      console.log('submit', values)
    }
    // 获取申请的类型
    const queryAProcess = () => {
      console.log('获取查询审批流程')
      // let devd = ['1', '2', '3']
      // columns.value = devd
      queryApprovalProcess()
        .then(res => {
          console.log(res)
          columns.value = res.result
        })
        .catch(err => console.log(err))
    }
    // 获取申请类型的模板
    const getTemplateDetails = () => {
      let param = {
        id: 17
      }
      queryTemplateDetails(param)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    onBeforeMount(() => {
      queryAProcess()
    })
    onMounted(() => {
      // queryAProcess()
      getTemplateDetails()
    })
    return { onSubmit, state, columns, onConfirm, key_value, customFieldName, getTemplateDetails }
  }
}
</script>
<style scoped>
</style>
