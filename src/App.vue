<template>
  <router-view />
</template>

<script>
import { ref, onBeforeMount, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

import { useRouter } from 'vue-router'

import { Dialog, Notify } from 'vant'
import config from '@/config/index.js'
import { getlarkAuthCode } from '@/util/lark'
// @ is an alias to /src

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const router = useRouter()
    const testFS = () => {
      window.h5sdk.ready(() => {
        //  lark.ready参数为回调函数，在环境准备就绪时触发
        alert('ok')
      })
    }
    onBeforeMount(() => {})
    onMounted(() => {
      testFS()
    })

    return {}
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
