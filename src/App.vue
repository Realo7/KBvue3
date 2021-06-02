<template>
  <router-view />
</template>

<script>
import { ref, onBeforeMount, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { getAuthCode } from '@/util/dingtalk'
import { useRouter } from 'vue-router'
import { bindUserwithDD } from '@/api/user.js'
import { Dialog, Notify } from 'vant'
import config from '@/config/index.js'
import { getlarkAuthCode } from '@/util/lark'
// @ is an alias to /src

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const router = useRouter()
    const getcode = () => {
      getlarkAuthCode()
        .then(res => {
          Notify(res)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

    onBeforeMount(() => {
      getcode()
    })
    onMounted(() => {})

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
