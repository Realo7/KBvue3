<template>
  <div style="margin:100px 15px 0px 15px">
    <van-form @submit="onSubmit">
      <van-field v-model="kindPicker.name "
                 readonly
                 clickable
                 name="picker"
                 label="申请类型"
                 placeholder="点击选择申请类型"
                 @click="state.showPicker1 = true" />
      <van-empty v-if="key_value==''"
                 description="暂时没有该申请单的字段">

      </van-empty>

      <van-field v-for="(item,index) in key_value"
                 :key="item.id"
                 v-model="item.value"
                 clickable
                 :readonly="item.type==='时间'"
                 @click="item.type==='时间'?dateclick(item,index):state.showPicker2=false"
                 :name="item.key"
                 :label="item.key"
                 :placeholder="`请填写${item.key}`"
                 :rules="[{ required: true, message: `请填写${item.key}` }]" />

      <div style="margin: 16px;">
        <van-button round
                    block
                    type="primary"
                    native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <van-popup v-model:show="state.showPicker1"
               position="bottom">
      <van-picker :columns="columns"
                  :columns-field-names="customFieldName"
                  @confirm="onConfirm"
                  @cancel="state.showPicker1 = false" />
    </van-popup>

    <van-popup v-model:show="state.showPicker2"
               position="bottom">
      <van-datetime-picker v-model="currentDate"
                           type="date"
                           title="选择年月日"
                           :min-date="minDate"
                           @confirm="onDataConfirm"
                           @cancel="state.showPicker2 = false" />
    </van-popup>
  </div>
</template>

<script>
import { ref, onBeforeMount, onMounted, reactive, nextTick, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { queryApprovalProcess, queryTemplateDetails, goTemplate, queryTemplateTable } from '@/api/kaoqin.js'

// @ is an alias to /src

export default {
  name: 'goApproval',
  setup() {
    let minDate = ref(new Date())
    // let maxDate = ref('')
    let currentDate = ref()
    watch(currentDate, (a, b) => {
      console.log('侦听探针' + a + '旧的' + b)
    })
    let selectedindex = ref()
    let key_value = ref([])
    let columns = ref([])
    const picker = ref(null)
    const customFieldName = {
      text: 'name'
    }
    const kindPicker = reactive({
      name: '',
      pickerid: 0
    })
    const state = reactive({
      showPicker1: false,
      showPicker2: false
    })

    //点击时间表单框体触发
    const dateclick = (item, index) => {
      console.log(key_value.value[index])
      selectedindex.value = index
      state.showPicker2 = true
    }
    //选择申请类型弹窗确认
    const onConfirm = value => {
      kindPicker.name = value.name
      kindPicker.pickerid = value.formTemplateId
      state.showPicker1 = false
      if (kindPicker.pickerid !== 0) {
        getTemplateDetails()
      }
    }
    // 点击时间弹窗确认触发
    const onDataConfirm = value => {
      console.log('sadasdadasdasdasdasd' + selectedindex.value)
      key_value.value[selectedindex.value].value = value
      state.showPicker2 = false
    }
    // 提交触发,f发起审批
    const onSubmit = values => {
      console.log('submit', values)
      goTemplate()
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
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
        id: kindPicker.pickerid
      }
      queryTemplateDetails(param)
        .then(res => {
          key_value.value = res.result
          key_value.value.map((item, index) => {
            item.value = ''
          })
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    onBeforeMount(() => {
      queryAProcess()
    })
    onMounted(() => {})
    return {
      currentDate,
      kindPicker,
      onSubmit,
      state,
      columns,
      onConfirm,
      key_value,
      customFieldName,
      getTemplateDetails,
      onDataConfirm,
      minDate,
      dateclick
    }
  }
}
</script>
<style scoped>
</style>
