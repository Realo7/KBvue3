<template>
  <div class="content">
    <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="loadmore">
      <van-empty description="当前没有审批" v-show="applyList.list == ''" />

      <van-cell
        v-for="item in applyList.list"
        :key="item.id"
        :title="item.type"
        :value="item.state"
        :label="item.dt"
        :to="{ path: '/approvalDetail', query: { listNo: item.listNo } }"
        is-link
      />
    </van-list>
  </div>
</template>
<script>
import { querryMyApply } from '@/api/kaoqin.js'
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const state = reactive({
      list: [],
      loading: false,
      finished: false
    })
    let applyList = reactive({ list: [] })
    let querryInfo = reactive({
      userId: store.state.qhid,
      userName: store.state.qhusername,
      pageNum: 0,
      pageSize: 15
    })
    const loadmore = () => {
      console.log(querryInfo.pageNum)
      querryInfo.pageNum += 1
      getMyApply()
    }
    //查询apply
    const getMyApply = () => {
      let fashe = querryInfo
      querryMyApply(fashe)
        .then(res => {
          // console.log(res)

          applyList.list = [...applyList.list, ...res.result.list]
          console.log(`+++++_____+++++${applyList.list.length}`)
          state.loading = false
          if (res.result.list.length < querryInfo.pageSize) {
            state.finished = true
          }
        })
        .catch(err => {
          state.finished = true
          console.log(err)
        })
    }
    onMounted(() => {})
    return { getMyApply, applyList, state, loadmore }
  }
}
</script>
<style scoped>
.content {
  margin-top: 2rem;
}
</style>
