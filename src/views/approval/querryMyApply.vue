<template>
  <div class="content">
    <van-cell-group>
      <van-cell v-for="item in applyList.list"
                :key="item.id"
                :title="item.type"
                :value="item.state"
                :label="item.dt"
                is-link />
    </van-cell-group>
  </div>
</template>
<script>
import { querryMyApply } from '@/api/kaoqin.js'
import { onMounted, reactive } from 'vue'
export default {
  setup() {
    let applyList = reactive({ list: [] })
    const getMyApply = () => {
      //暂时使用李经理的申请数据
      let fashe = { userId: 82, userName: '李经理', pageNum: 1, pageSize: 10 }
      querryMyApply(fashe)
        .then(res => {
          console.log(res)
          applyList.list = res.result.list
          console.log(applyList)
        })
        .catch(err => {
          console.log(err)
        })
    }
    onMounted(() => {
      getMyApply()
    })
    return { getMyApply, applyList }
  }
}
</script>
<style scoped>
.content {
  margin-top: 2rem;
}
</style>