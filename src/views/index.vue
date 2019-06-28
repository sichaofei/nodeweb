<template>
    <div>
        <router-link to="/map"> 跳转地图</router-link>
    </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
}
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
