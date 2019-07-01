<template>
    <div class="login">
        <h1>登陆</h1>
        <mt-field label="用户名"  @blur.native.capture="bulrScroll()" placeholder="请输入用户名" v-model="username"></mt-field>
        <mt-field label="密码"  @blur.native.capture="bulrScroll()" placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <mt-button @click="login()" type="primary" class="loginTxt">登陆</mt-button>
         <mt-button @click="toreser()" type="default" class="loginTxt">注册</mt-button>
        <Header title="登陆" :backNum="num"/>
    </div>
</template>
<script>
import Header from '../../components/header'
import fetch from "../../fetch"
import { Toast } from 'mint-ui';
import {mapActions} from 'vuex'
export default {
  components:{
      Header
  },
//   beforeRouteEnter (to, from, next) {
//      console.log(to,from)
//      if(from.name=="mydetail"){
//           next(vm=>{
//             vm.num="index";
//         })
//      }else{
//         next(vm=>{
//             vm.num="1";
//         })
//      }
     
//   },
   data(){
     return{
       password:'',
       username:'',
       num:"index"
     }
   },
   created() {
       console.log(this.$route)
        if(this.$route.query.redirect){
             this.redirect=this.$route.query.redirect
        }
        console.log()
      },
   methods:{
       ...mapActions( // 语法糖
          ['changeUserId'] // 相当于this.$store.dispatch('modifyName'),提交这个方法
      ),
    //   注册
      toreser(){
          this.$router.replace("/reser")
      },
       login(){
           if(this.username==""){
               this.toast("请输入用户名")
               return
           }
           if(this.password==""){
               this.toast("请输入密码")
           }
           let obj={
               name:this.username,
               password:this.password
           }
           fetch.post('/login/msg',obj)
           .then((res)=>{
               console.log(res)
               if(res.code==0){
                   this.toast(res.msg)
               }else{
                   this.changeUserId(res.data.userId)
                   localStorage.setItem("userId",res.data.userId);
                   if(!this.redirect){
                        this.$router.replace({ path:"/"})
                   }else{
                        this.$router.replace({ path:this.redirect})
                   }
                  
               }
           })
       },
        toast(msg){
            Toast({
                message: msg,
                position: 'middle',
                duration: 1000
        });
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
    .login{
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

