import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Map from "./views/map.vue"
import Index from "./views/index.vue"
import store from './store/index.js'
import Tarbar from "./views/tabBar.vue"
Vue.use(Router)

const router=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Tarbar',
      component: Tarbar,
      redirect:"/index",
      children:[
        {
          path:"/index",
          name:"index",
          component: Index,
        },
        {
          path:"/my",
          name:"my",
          meta:{
            isLogin:true,
          },
          component:()=>import("./views/user/my.vue")
        }
      ]
    },
    {
      path: '/map',
      name: 'map',
      component: Map,
      meta: {
        isLogin: false
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
    ,
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/user/login.vue')
    },{
      path: '/reser',
      name: 'reser',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/user/reser.vue')
    },{
      path:'/mydetail',
      name:"mydetail",
      component:()=>import("./views/user/mydetail")
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {  // 判断该路由是否需要登录权限
    if(localStorage.getItem("userId")){
      store.state.userId=localStorage.getItem("userId")
    }
      if (store.state.userId!="") {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.path}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})
export default router