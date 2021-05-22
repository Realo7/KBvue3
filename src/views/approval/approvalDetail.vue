<template>
  <div>
    <van-field v-for="item in detail"
               :key="item.id"
               v-model="item.value"
               clickable
               readonly
               :name="item.key"
               :label="item.key"
               :rules="[{ required: true, message: `请填写${item.key}` }]" />
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { detailquerry, detailRecordTable, detailRecord } from '@/api/kaoqin.js'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    let detail = ref([])
    let listNo = ref()
    const querrydetail = listno => {
      console.log(listno)
      let fashe = { listNo: listno }
      detailquerry(fashe)
        .then(res => {
          if (res.code != 200) {
            // 提示
            Notify({ type: 'waring', message: res.msg })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    const recordDetail = listno => {
      let fashe = { listNo: listno }
      detailRecord(fashe)
        .then(res => {
          if (res.code != 200) {
            // 提示
            Notify({ type: 'waring', message: res.msg })
          }
          console.log(res)
          detail.value = res.result

          console.log('查询详情' + res)
          console.log('========' + detail.value)
          for (let item of detail.value) {
            console.log(item)
            switch (item.key) {
              case 'applyUserName':
                item.key = '用户名'
                break
              case 'applyDepartmentName':
                item.key = '部门'
                break
              case 'applyCompanyName':
                item.key = '公司'
                break
            }
            console.log(item.key)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    const recordTable = listno => {
      let fashe = { listNo: listno }
      detailRecordTable(fashe)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    onMounted(() => {
      //  = router.currentRoute._value.params.listNo
      listNo.value = route.query.listNo
      querrydetail(listNo.value)
      recordDetail(listNo.value)
      recordTable(listNo.value)
    })
    return {
      detail
    }
  }
}
</script>