<template>
    <div class="userDetail">
        <div class="inputFileWrapper">
             <label for="inputFile">
                 <!-- <input type="file" id="inputFile" @input="upload()" ref="inputFile"/> -->
                 <input type="file" id="inputFile" @change="upload()" ref="inputFile" accept="image/*">
                 <span class="custorm-style">
                     <span class="left-button">选择头像</span>
                 </span>
             </label>
         </div>
        <img :class="imgurl.length!=0?'head':'nohead'" :src="imgurl" alt="">
         <mt-button size="large" type="primary" @click="uploadImage()">确认修改</mt-button>
        <mt-button @click="goOut()" class="goout" size="large">退出登录</mt-button>
         <Header title="设置" backNum="1"/>
    </div>
</template>
<script>
import Header from '../../components/header'
import fetch from "../../fetch"
import { Toast } from 'mint-ui';
import {mapGetters} from "vuex"
export default {
components:{
      Header
},
data(){
    return{
       imgurl:'',
       fileImg:null
    }
},
computed:{
...mapGetters(["userId"])
},
created(){
       console.log(this.userId)
},
methods:{
        goOut(){
            this.$router.push({path: '/login',
              query: {redirect: "/my"}})  // 将跳转的路由path作为参数，登录成功后跳转到该路由)
            localStorage.removeItem("userId")   
            this.$store.state.userId=""
        },
        // 选择图片
        upload(){
           var rd = new FileReader();//创建文件读取对象
            var file=this.$refs.inputFile.files[0];//获取file组件中的文件
            // alert(JSON.stringify(this.fileImg)
            // console.log(file)
            rd.readAsDataURL(file);//文件读取装换为base64类型
            let that=this
            var imageType = /^image\//;
            // 是否是图片
             if(!imageType.test(file.type)) {
               that.toast("请选择图片格式的文件")
                    return;
                }
            rd.onloadend = function(e) {
             that.imgurl=e.currentTarget.result
            }
            this.fileImg=file
           
        },
        // 上传图片
        uploadImage(){
            if( this.imgurl==""){
                this.toast("请选择图片")
                return
            }
            var formdata = new FormData()
            formdata.append('multfile', this.fileImg)
            fetch.post("/upload/headImg",formdata,"multer")
            .then((res)=>{
                 this.uploadImgMongodb(res.data.imgurl)
            })
        },
        // 上传图片绑定数据库
        uploadImgMongodb(url){
            console.log(this.userId)
            let obj={
                imgUrl:[url],
                userId:this.userId
            }
            fetch.post("/upload/imgMongodb",obj)
            .then((res)=>{
                this.imgurl=""
                console.log(res)
            })
        },
        toast(msg){
            Toast({
                message: msg,
                position: 'middle',
                duration: 1000
            });
         },
    }
}
</script>
<style scoped>
    .userDetail{
    padding-top: 100px;
    }
    .goout{
        margin-top: 300px;
    }
    .inputFileWrapper label{
                display: block;
                float: left;
                position: relative;
    }
        .inputFileWrapper input[type="file"]{
            position: absolute;
            width: 1px;
            height: 1px;
            clip:rect(0,0,0,0);
        }
        .inputFileWrapper .custorm-style{
            width:100VW;
            height: 50px;
            display: flex;
            justify-content: center;
        }
        .inputFileWrapper .custorm-style .left-button{
            width: 80px;
            line-height: 50px;
            background: #cccccc;
            color: #fff;
            display: block;
            text-align: center;
        }.head{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        .nohead{
            display: none
        }
</style>
