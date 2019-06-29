<template>
<div>
    <router-view></router-view>
    <div class="taBar">
        <div>
            <router-link to="/index" active-class="red" replace>首页</router-link>
        </div>
        <div> <router-link to="/my" active-class="red" replace>个人</router-link></div>
    </div>
    </div>
</template>
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
