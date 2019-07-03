<template>
    <div class="userList">
        <div v-for="(item,index) in num" :key="index" class="user">
            <router-link :to="{path: '/socket', query:item}" v-if="item.userId!=userId">
            {{item.name}} 
             <span  v-if="msg.length&&item.userId==msg[0].userId" class="msgL">{{msg.length}}</span>
            </router-link>
            
        </div>
        <!-- <Header title="好友" backNum="1"/> -->
    </div>
</template>
<script>
import Vue from 'vue'
// import socket from"../../socket"
// socket()
import fetch from "../../fetch"
import {mapGetters} from "vuex"
import Header from "../../components/header"
export default {
    components:{
        Header
    },
    name:"peoples",
    data(){
        return{
            list:[],
            msg:[],
            // 在线人数
            num:[],
            msgList:[]
        }
    },
    computed:{
        ...mapGetters(
            ["userId"]
        )
    },
   created(){
       this.$socket.emit('reqNum')
   },
    sockets: {
       userNum(num){
           this.num=num
       },
    //    监听发送的数据
       message(msg){
            this.findSockets(msg.oneUserId)
           this.msg.push(msg)
           let msgs={type:0,msg:msg.msg}
           this.msgList.push(msgs)
           this.saveSckets(msg.oneUserId)
       }
    },
   mounted(){
        this.findFriend()
   },
   methods:{
    //    查询在线人数
       findFriend(){
           fetch.post("/find/friend")
           .then((res)=>{
               this.list=res.data
           })
       },
    //    查询发哦你给的数据指向人 双方数据
       findSockets(userId){
             let id=this.userId+userId
           if(localStorage.getItem(id)){
               this.msgList=JSON.parse(localStorage.getItem(id))
           }
       },
    //    保存两人发送数据
       saveSckets(userId){
             let id=this.userId+userId
           localStorage.setItem(id,JSON.stringify(this.msgList))
       }
   }
}
</script>
<style scoped>
    .userList a{
        display: block;
        color: black;
        font-size: 18px;
        text-decoration: none;
        text-align: left;
        padding-left: 20px;
        padding: 10px 0px;
        border-bottom: 1px solid black;
        position: relative;
    }
    .msgL{
        float: right;
        color: red;
        font-size: 12px;
        position: absolute;
        right: 0;
        top: 10px;
    }
</style>