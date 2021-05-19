<template>
  <div>
    <van-tabs v-model:active="active">
      <!-- 标签数量超过 5 个时，标签栏可以在水平方向上滚动，切换时会自动将当前标签居中。 -->
      <van-tab v-for="item in result.list"
               :key="item.name"
               :title="item.title">
        <div style="height:15.5rem;text-align:center">
          {{item.name}}
          <van-empty v-if="item.value===''"
                     description="当前没有审批" />
        </div>

      </van-tab>

    </van-tabs>

  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { myApproval } from '@/api/kaoqin.js'
export default {
  setup() {
    const result = reactive({
      list: [
        { title: '审批1号', name: '审批1', value: '' },
        { title: '审批2号', name: '审批2', value: '' }
      ]
    })
    const active = ref(2)
    // 获取待审批列表
    const getMyApproval = () => {
      let userid = '22S'
      myApproval(userid)
        .then(res => {
          console.log(res)
          //   获取了列表之后渲染到result.list.value里面
        })
        .catch(err => {
          console.log(err)
        })
    }
    onMounted(() => {
      getMyApproval()
    })
    return { active, result }
  }
}
</script>