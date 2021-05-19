<template>
  <div>我的界面
    <button @click="gotobind">进入绑定界面</button>
  </div>
</template>
<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const gotobind = () => {
      router.push({
        path: '/ddqhbind'
      })
    }
    onMounted(() => {
      console.log(store.state)
    })
    return { gotobind }
  }
}
</script>