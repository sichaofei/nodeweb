<template>
    <div class="reser">
        <h1>注册</h1>
        <mt-field label="用户名"   @blur.native.capture="bulrScroll()" placeholder="请输入用户名" v-model="name"></mt-field>
        <mt-field label="密码"   @blur.native.capture="bulrScroll()" placeholder="请输入密码" type="password" v-model="password"></mt-field>
         <mt-field label="密码"   @blur.native.capture="bulrScroll()" placeholder="请再次输入密码" type="password" v-model="passwordT"></mt-field>
          <mt-field label="手机号"  @blur.native.capture="bulrScroll()" placeholder="请再次手机号" type="number" maxLength="11" v-model="phone"></mt-field>
        <mt-button type="primary" @click="reser()" class="loginTxt">注册</mt-button>
          <mt-button type="default" @click="tologin()" class="loginTxt">登陆</mt-button>
         <Header title="注册" backNum="index"/>
    </div>
</template>
<script>
import Header from '../../components/header'
import { Toast } from 'mint-ui';
import fetch from "../../fetch"
import { setTimeout } from 'timers';
export default {
    components:{
      Header
  },
   data(){
     return{
       name:'',
       password:'',
       passwordT:'',
       username:'',
       phone:''
     }
   },
   methods:{
       tologin(){
           this.$router.replace("/login")
       },
    reser(){
        if(this.name==""){
             this.toast("请输入用户名")
            return
        }
         if(this.password==""){
             this.toast("请输入密码")
            return
        }
         if(this.passwordT==""){
             this.toast("请确认密码")
            return
        }
        if(this.password!=this.passwordT){
            this.toast("请确保两次密码一致")
            return
        }
         if(this.phone==""){
             this.toast("请输入手机号")
            return
        }
        if(!(/^1[3456789]\d{9}$/.test(this.phone))){ 
            this.toast("手机号错误")
            return
        } 
       this.reserMsg()
    },
    toast(msg){
        Toast({
            message: msg,
            position: 'middle',
            duration: 1000
       });
    },
    // 提交数据注册
    reserMsg(){
        let obj={
            name:this.name,
            password:this.password,
            phone:this.phone

        }
        fetch.post("/reser/msg",obj)
       .then((res)=>{
           if(res.code==0){
               this.toast(res.msg)
           }else{
               this.toast("注册成功") 
               setTimeout(()=>{
                   this.$router.replace({ path:"/login"})
               },1000)
           }

       })
    },
    // 解决键盘落下页面回弹
    bulrScroll(){
        window.scrollTo(0,0)
    }
   }
}
</script>
<style scoped>
h1{
    margin-bottom: 50px;
    font-size: 20px;
}
    .reser{
        padding-top:100px;
        height: 100vh;
        box-sizing: border-box;
        background: #cccccc;
    }
    .mint-cell-wrapper{
        font-size: 50px;
    } 
    .loginTxt{
        font-size: 18px;
        width: 100px;
        margin-top: 50px;
    }
</style>

