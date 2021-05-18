<template>
  <div>
    <van-grid clickable
              :column-num="2">
      <van-grid-item icon="home-o"
                     text="发起审批"
                     to="/" />
      <van-grid-item icon="search"
                     text="233"
                     url="https://www.baidu.com" />
    </van-grid>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { getUser } from '../api/home'

export default {
  setup() {
    const msg = ref('vue3.0')
    const list = ref([])
    const store = useStore()

    const name = computed(() => store.state.userNmae)
    const handleBtn = () => {
      // 留个模板好记
      store.commit('getUserNmae', '123')
    }
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
h1 {
  display: block;
  font-size: 40px;
  text-align: center;
  padding: 20px 0;
}
ul {
  li {
    display: block;
    font-size: 20px;
    padding: 20px 0;
    text-align: center;
  }
}
</style>
