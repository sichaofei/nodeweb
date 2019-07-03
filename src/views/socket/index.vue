<template>
    <div class="socket">
        <div class="msgList">
            <div :class="item.type==0?'other':'my'" v-for="(item,index) in msgList" :key="index">
                {{item.msg}}
            </div>
        </div>
        <div class="sendMsg">
            <input type="text" v-model="msg" @blur="blur()">
            <span @click="send()">发送</span>
             <Header :title="name" backNum="1"/>
        </div>
    </div>
</template>
<script>
import {mapGetters} from "vuex"
import Header from "../../components/header"
export default {
    components:{
        Header
    },
    data(){
        return{
            msg:'',
            friendUserId:'',
            name:'',
            friendSocidId:'',
            msgList:[],
            otherList:[]
        }
        
    },
    created(){
       let {name,userId,socketId}=this.$route.query
       this.name=name
       this.friendUserId=userId
       this.friendSocidId=socketId
       let id=this.userId+userId
    //    console.log(id)
    // 查询两人聊天数据
       if(localStorage.getItem(id)){
             this.msgList=JSON.parse(localStorage.getItem(id)) 
       }
     
    },
    sockets:{
        message(msg){
            // 判断是否对向好友发送的消息
            if(msg.oneUserId==this.friendUserId){
                  let msgs={type:0,msg:msg.msg}
                    this.msgList.push(msgs)
                     this.saveSckets(this.friendUserId)
            }else{
                // 不是对向好友发送的信息
                  let msgs={type:0,msg:msg.msg}
                   let id=msg.userId+msg.oneUserId //发送指向的id+发送人的id 
                   this.findSaveSockets(id)
                    this.otherList.push(msgs)
                   this.saveotherSckets(id)
            }
          
       }
    },
    computed:{
        ...mapGetters(
            ["userId"]
        )
    },
    methods:{
        // 发送聊天数据
        send(){
            let obj={socketId:this.friendSocidId,msg:this.msg,userId:this.friendUserId,oneUserId:this.userId} //本人id和要发送人的userId
            this.$socket.emit("sendMsgTo",obj)
            let msgs={type:1,msg:this.msg}
            this.msgList.push(msgs)
            this.msg=""
             this.saveSckets(this.friendUserId)
        },
        // 保存对向发送的数据
        saveSckets(ids){
            let id=this.userId+ids
            localStorage.setItem(id,JSON.stringify(this.msgList))
        },
        // 保存发送的另一个好友聊天数据
        saveotherSckets(id){
           localStorage.setItem(id,JSON.stringify(this.otherList) )
        },
        // 查询另一个好友的好友的聊天数据
        findSaveSockets(id){
            if(localStorage.getItem(id)){
                this.otherList=JSON.parse(localStorage.getItem(id))
            }
        },
        blur(){
            window.scrollTo(0,0)
        }
    },
}
</script>
<style scoped>
    .sendMsg{
        position: fixed;
        left: 0;
        bottom: 0;
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        box-sizing: border-box;
        background: white;
        padding-bottom: 20px;
    }
    .sendMsg span{
        font-size: 18px;
        color: aqua;
    }
     .sendMsg input{
         width: 80%;
         height: 30px;
         background: #cccccc;
         border: 0;
         outline: none;
         border-radius: 5px;
         padding-left: 10px;
     }
     .other{
         text-align: left;
         color: black;
         font-size: 20px;
     }
     .my{
         text-align: right;
         color: aqua;
          font-size: 20px;
     }
     .msgList{
         margin-top: 100px;
         padding: 0 20px;
       padding-bottom: 80px;
     }
</style>