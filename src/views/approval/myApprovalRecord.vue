<template>
  <div class="content">
    <van-empty v-if="applyList.list==''"
               description="当前没有审批记录" />
    <van-cell-group>
      <van-cell v-for="item in applyList.list"
                :key="item.id"
                :title="item.type"
                :value="item.state"
                :label="item.dt"
                is-link
                :to="{ path:'/approvalDetail',query:{listNo:item.listNo} }" />
      <!-- :to="{ path:'/approvalDetail',params:{listNo:item.listNo} }" -->
      <!-- :to="'/approvalDetail?listNo='+item.listNo" -->
    </van-cell-group>
  </div>
</template>
<script>
import { myApprovalRecord } from '@/api/kaoqin.js'
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    let applyList = reactive({ list: [] })
    const getMyRecord = () => {
      let fashe = {
        userId: store.state.qhid,
        userName: store.state.qhusername,
        pageNum: 1,
        pageSize: 50
      }
      myApprovalRecord(fashe)
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
      getMyRecord()
    })
    return { getMyRecord, applyList }
  }
}
</script>
<style scoped>
.content {
  margin-top: 2rem;
}
</style>