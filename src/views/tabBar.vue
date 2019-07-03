<template>
<div>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div class="taBar">
        <div>
            <router-link to="/index"   active-class="red" replace>首页</router-link>
        </div>
        <div>
            <router-link to="/peoples"  active-class="red" replace>好友</router-link>
        </div>
        <div> <router-link to="/my"  active-class="red" replace>个人</router-link></div>
    </div>
    </div>
</template>
<script>
import socket from "../socket"
socket()
export default {
    sockets:{
       goout(){
            this.$router.push({path: '/login',
              query: {redirect: "/peoples"}})  // 将跳转的路由path作为参数，登录成功后跳转到该路由)
            localStorage.removeItem("userId")   
            this.$store.state.userId=""
       }
    }
}
</script>
<style scoped>
    .taBar{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50px;
        display: flex;
        padding: 0 20px;
        justify-content: space-between;
        box-sizing: border-box;
        background: white;
        box-sizing: border-box;
    }
    .taBar div{
        width: 50px;
        color: black;
        font-size: 20px;
    }
    .taBar a{
        outline: none;
        text-decoration: none;
        color: black;
    }
     .taBar .red{
        color: red
    }
</style>
