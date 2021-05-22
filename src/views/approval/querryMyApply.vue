<template>
  <div class="content">
    <van-cell-group>
      <van-cell v-for="item in applyList.list"
                :key="item.id"
                :title="item.type"
                :value="item.state"
                :label="item.dt"
                :to="{ path:'/approvalDetail',query:{listNo:item.listNo} }"
                is-link />
    </van-cell-group>
  </div>
</template>
<script>
import { querryMyApply } from '@/api/kaoqin.js'
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    let applyList = reactive({ list: [] })
    const getMyApply = () => {
      let fashe = {
        userId: store.state.qhid,
        userName: store.state.qhusername,
        pageNum: 1,
        pageSize: 50
      }
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