<template>
  <div style="margin:100px 15px 0px 15px">
    <van-swipe class="my-swipe"
               :autoplay="3000"
               indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-grid clickable
              :column-num="2">
      <van-grid-item icon="records"
                     text="发起审批"
                     to="/goApproval" />
      <van-grid-item icon="sign"
                     text="待我审批"
                     to="/myApproval" />
      <van-grid-item icon="completed"
                     text="我的审批记录"
                     to="/myApprovalRecord" />
      <van-grid-item icon="todo-list-o"
                     text="我的申请"
                     to="/querryMyApply" />

    </van-grid>
  </div>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { getUser } from '../api/home'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const msg = ref('vue3.0')
    const list = ref([])
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.userNmae)
    const handleBtn = () => {
      // 留个模板好记
      store.commit('getUserNmae', '123')
    }
    onMounted(() => {
      store.state.showtabbar = true
    })
    return {
      msg,
      list,
      name,
      handleBtn
    }
  }
}
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
