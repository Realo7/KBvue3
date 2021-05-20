<template>
  <div>
    <van-tabs v-model:active="active">
      <!-- 标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。 -->
      <van-tab v-for="item in result.list"
               :key="item.id"
               :title="item.type">
        <div style="height:15.5rem;">
          {{item.name}}
          <van-empty v-if="item.state!=='待审核'"
                     description="当前没有审批" />

          <van-cell-group>
            <van-cell title="申请时间"
                      :value="item.dt" />
            <van-cell title="申请ID"
                      :value="item.id" />
            <van-cell title="申请状态"
                      :value="item.state" />
            <van-cell title="申请类型"
                      :value="item.type" />
            <van-cell title="申请用户"
                      :value="item.userName" />
            <van-cell title="申请用户ID"
                      :value="item.userId" />
          </van-cell-group>
          <van-button round
                      block
                      type="primary"
                      @click="gopassApproval('通过')">
            通过申请
          </van-button>
          <van-divider />
          <van-button round
                      block
                      type="primary"
                      @click="gopassApproval('驳回')">
            拒绝申请
          </van-button>
        </div>

      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

import { myApproval, passApproval } from '@/api/kaoqin.js'
export default {
  setup() {
    const store = useStore()
    let obj = ref()
    const result = reactive({
      list: []
    })
    const qhid = computed(() => store.state.qhid)
    const qhusername = computed(() => store.state.qhusername)
    const active = ref(2)
    // 获取待审批列表
    const getMyApproval = () => {
      let fashe = {
        // userId: qhid.value,
        // userName: qhusername.value,
        userId: 1,
        userName: 'admin',
        pageNum: 1,
        pageSize: 10
      }
      myApproval(fashe)
        .then(res => {
          console.log(res)
          //   获取了列表之后渲染到result.list.value里面
          console.log(res.result.list)
          // result.list.push(res.result.list)
          result.list = res.result.list
        })
        .catch(err => {
          console.log(err)
        })
    }
    //通过申请
    const gopassApproval = string => {
      // 提示确认

      passApproval()
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    onMounted(() => {
      getMyApproval()
    })
    return { active, result, gopassApproval }
  }
}
</script>
<style scoped>
.content {
  margin: 1rem 1rem 0 1rem;
}
</style>