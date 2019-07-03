<template>
    <div class="userBox">
        <div class="user">
            <div class="left">
                <img src="../../images/mode.jpg" alt="" v-if="imgUrl.length==0">
                <img :src="[imgUrl[0]]" alt="" v-if="imgUrl.length>0">
            </div>
            <div class="right">
                <div>{{name}} <span>{{phone}}</span> </div>
                <div>{{timestamp}}</div>
            </div>
        </div>
        <mt-button class="seting" size="large" @click="todetail()">头像设置</mt-button>
        <mt-button @click="showconfirm()" class="goout" size="large">退出登录</mt-button>
        <confirm :show="show" @confirm="confirm"/>
    </div>
</template>
<script>
import {mapGetters} from "vuex"
import fetch from "../../fetch"
import socket from "../../socket"
import confirm from "../../components/confirm"
export default {
    components:{confirm},
    name:"my",
    data(){
        return{
            data:{
            },
            name:'',
            timestamp:'',
            phone:'',
            imgUrl:[],
            show:false
        }
    },
    computed:{
        ...mapGetters(
            ["userId"]
        )
    },
    beforeRouteLeave (to, from, next) {
          to.meta.keepAlive=true
          next()
      },
    created(){
        fetch.post("/my/msg",{userId:this.userId})
        .then((res)=>{
            if(res.code==1){
                this.name=res.data.name
                this.phone=res.data.phone,
                this.formatDate(res.data.timestamp)
            }
        })
         this.getuserImg()
    },
    methods:{
        confirm(show){
            this.show=false
            if(show==true){
                this.goOut()
            }
        },
        showconfirm(){
            this.show=true
        },
        // 退出登录
         goOut(){
             this.$socket.emit("socketOut",this.userId)
            this.$router.push({path: '/login',
              query: {redirect: "/my"}})  // 将跳转的路由path作为参数，登录成功后跳转到该路由)
            localStorage.removeItem("userId")   
            this.$store.state.userId=""
            this.$socket.disconnect()
            
            
        },
        formatDate(now) { 
             var date = new Date(now);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            this.timestamp=Y+M+D;
        } ,
        todetail(){
            this.$router.push("/mydetail")
        },
        // 获取用户头像
        getuserImg(){
            let obj={userId:this.userId}
            fetch.post("/user/headImg",obj)
            .then((res)=>{
                console.log(res)
                if(res.data){
                    this.imgUrl=res.data.imgUrl
                }
            })
        }
    }
}
</script>
<style scoped>
    .user{
        width: 100%;
        display: flex;
        font-size: 16px;
        font-weight: 500;
        padding-top: 80px;
        padding-left: 10px;
         box-sizing: border-box;
    }
    .userBox{
        width: 100VW;
        box-sizing: border-box;
    }
    .user .left{
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
    }
    .user .left img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .user .right{
        text-align: left;
        display: flex;
        flex-direction: column;
       justify-content: center;
       margin-left:20px;
    }
    .seting{
        margin-top:40px;
    }
    .mint-button {
        margin-bottom: 10px;
    }
</style>