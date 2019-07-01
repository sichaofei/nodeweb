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
        <mt-button class="seting" size="large" @click="todetail()">设置</mt-button>
    </div>
</template>
<script>
import {mapGetters} from "vuex"
import fetch from "../../fetch"
export default {
    data(){
        return{
            data:{

            },
            name:'',
            timestamp:'',
            phone:'',
            imgUrl:[]
        }
    },
    computed:{
        ...mapGetters(
            ["userId"]
        )
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
        margin-top: 80px;
    }
</style>