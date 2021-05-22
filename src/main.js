import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Dialog,Toast,Notify } from 'vant';
// 移动端适配
import 'lib-flexible/flexible.js';

// 引入全局样式
import '@/assets/scss/index.scss';
// 全局引入按需引入UI库 vant
import { vantPlugins } from './plugins/vant.js'

createApp(App).use(store).use(router).use(vantPlugins)
.use(Dialog).use(Toast).use(Notify).mount('#app')