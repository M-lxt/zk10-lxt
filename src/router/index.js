import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/login/Login.vue'
import Admin from '@/pages/admin/Admin.vue'
import Guanli from '@/pages/guanli/Guanli.vue'
import Laiyuan from '@/pages/laiyuan/Laiyuan.vue'
import Liuxiang from '@/pages/liuxiang/Liuxiang.vue'
import Zucheng from '@/pages/zucheng/Zucheng.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect:'/admin/zucheng',
      meta:{
        isLogin:true
      },
      children:[
        {
          path:'/admin/guanli',
          name:'guanli',
          component:Guanli
        },
        {
          path:'/admin/liuxiang',
          name:'liuxiang',
          component:Liuxiang
        },
        {
          path:'/admin/zucheng',
          name:'zucheng',
          component:Zucheng
        },
        {
          path:'/admin/laiyuan',
          name:'laiyuan',
          component:Laiyuan
        },
      ]
    },
  ]
})

router.beforeEach((to,from)=>{
  if( to.matched.some(v=>v.meta.isLogin) ){
    const token = localStorage.getItem('token')
      if(!token){
        return '/login'
      }
  }
})


export default router
