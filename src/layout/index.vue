<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar v-show="show"
              :data="state.tabBar"
              @chang="handleChange"></TabBar>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import TabBar from '../components/TabBar/TabBar.vue'
import { useStore } from 'vuex'

export default {
  name: 'AppLayout',
  components: {
    TabBar
  },
  setup() {
    const store = useStore()
    // tabbar选项菜单项，可以动态生成
    let show = computed(() => store.state.showtabbar)
    const state = reactive({
      tabBar: [
        {
          title: '首页',
          to: {
            name: 'Home'
          },
          icon: 'home-o'
        },
        {
          title: '我的',
          to: {
            name: 'Mine'
          },
          icon: 'user-o'
        }
      ]
    })
    const handleChange = value => {
      console.log(value)
    }
    return {
      state,
      handleChange,
      show
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-content {
  margin-bottom: 1.4rem;
}
</style>
