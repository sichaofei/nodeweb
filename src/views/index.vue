<template>
    <div>
        <router-link to="/map"> 跳转地图</router-link>
        <router-link to="/peoples"> 聊天</router-link>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
</script>
<script>
</script>
<style scoped>
    a{
        font-size: 18px;
        color: #cccccc;
        outline: none;
        text-decoration: none;
    }
    div{
        padding-top: 100px;
    }
</style>
