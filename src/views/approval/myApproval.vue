<template>
  <div>
    <van-empty v-if="!result.list"
               description="当前没有审批" />
    <van-tabs v-if="result.list"
              v-model:active="active">
      <!-- 标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。 -->
      <van-tab v-for="item in result.list"
               :key="item.id"
               :title="item.type">
        <div style="height:15.5rem;">
          {{item.name}}

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
          <van-field v-model="message"
                     rows="2"
                     autosize
                     label="留言"
                     type="textarea"
                     maxlength="50"
                     placeholder="请输入留言"
                     show-word-limit />
          <van-button round
                      block
                      type="primary"
                      @click="gopassApproval(item.id,'通过')">
            通过申请
          </van-button>
          <van-divider />
          <van-button round
                      block
                      type="primary"
                      @click="gopassApproval(item.id,'驳回')">
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

import { Notify, Dialog } from 'vant'
import { myApproval, passApproval } from '@/api/kaoqin.js'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    let obj = ref()
    const result = reactive({})
    let message = ref('')
    const qhid = computed(() => store.state.qhid)
    const qhusername = computed(() => store.state.qhusername)
    const active = ref(2)
    // 获取待审批列表
    const getMyApproval = () => {
      let fashe = {
        userId: qhid.value,
        userName: qhusername.value,
        pageNum: 1,
        pageSize: 50
      }
      console.log(fashe)
      myApproval(fashe)
        .then(res => {
          console.log(res)
          //   获取了列表之后渲染到result.list.value里面
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          }
          if (res.result) {
            console.log('获取的列表' + res.result.list)
            result.list = res.result.list
          }
        })
        .catch(err => {
          Notify({ type: 'warning', message: '获取待审批列表错误' })
          console.log(err)
        })
    }
    //通过/驳回申请
    const gopassApproval = (id, string) => {
      // 提示确认
      let fashe = {
        userId: qhid.value,
        userName: qhusername.value,
        id: id,
        radio: string,
        dis: message.value
      }
      passApproval(fashe)
        .then(res => {
          if (res.code != 200) {
            Notify({ type: 'waring', message: res.msg })
          }
          console.log(res)
          Dialog.alert({
            title: '成功',
            message: res.msg,
            confirmButtonText: '回到首页'
          }).then(() => {
            router.replace({
              path: '/'
            })
          })
        })
        .catch(err => {
          Notify({ type: 'warning', message: '通过/驳回申请错误,请尝试返回首页重新审批' })
          console.log(err)
        })
    }
    onMounted(() => {
      getMyApproval()
    })
    return { active, result, gopassApproval, message }
  }
}
</script>
<style scoped>
.content {
  margin: 1rem 1rem 0 1rem;
}
</style>