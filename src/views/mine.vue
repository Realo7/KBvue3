<template>
  <div class="demo-home">
    <!-- <button @click="gotobind">进入绑定界面</button> -->
    <div>

    </div>
    <div>
      <van-cell-group>
        <van-cell v-show="username"
                  title="当前登录用户"
                  :value="username" />
        <van-cell title="琦航账号"
                  :value="qhusername" />
        <van-cell title="琦航ID"
                  :value="qhid" />
        <van-cell v-show="ddid"
                  title="钉钉ID"
                  :value="ddid" />

      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const username = computed(() => store.state.username)
    const qhusername = computed(() => store.state.qhusername)
    const ddid = computed(() => store.state.userid)
    const qhid = computed(() => store.state.qhid)

    const router = useRouter()
    const store = useStore()
    const gotobind = () => {
      router.push({
        path: '/ddqhbind'
      })
    }

    const fuuc = () => {
      console.log(username, qhusername, qhid, ddid)
    }
    onMounted(() => {
      fuuc()
    })
    return { gotobind, username, qhusername, qhid, ddid }
  }
}
</script>
<style lang="scss">
.demo-home {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 46px 20px 20px;
  background: #fff;
}
</style>