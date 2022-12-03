import Vue from 'vue'
import Router from 'vue-router'
import Drawer from './components/view/drawer.vue'
import Drawer2 from './components/view/drawer2.vue'
//
// 他のコンポーネントは省略
//

Vue.use(Router)

export default new Router({
  // デフォルトの挙動では URL に `#` が含まれる.
  // URL から hash を取り除くには `mode:history` を指定する
  mode: 'history',                  
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'drawer',
      component: Drawer
    },
    //
    // 省略
    //
    {
      path: '/Drawer2',
      name: 'Drawer2',
      component: Drawer2 
    }
  ]
})