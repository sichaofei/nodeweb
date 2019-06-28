<template>
    <div class="userDetail">
        <div class="inputFileWrapper">
             <label for="inputFile">
                 <form action="" enctype="multipart/form-data">
                 <!-- <input type="file" id="inputFile" @input="upload()" ref="inputFile"/> -->
                 <input type="file" name="multfile" id="inputFile" multiple="multiple" @change="upload()" ref="inputFile" accept="image/*">
                </form >
                 <span class="custorm-style">
                     <span class="left-button">上传头像</span>
                 </span>
             </label>
         </div>
         <img class="head" :src="imgurl" alt="">
        <mt-button @click="goOut()" class="goout" size="large">退出登录</mt-button>
         <Header title="设置" backNum="1"/>
    </div>
</template>
<script>
import Header from '../../components/header'
import fetch from "../../fetch"
export default {
components:{
      Header
},
data(){
    return{
       imgurl:'' 
    }
},
methods:{
        goOut(){
            this.$router.push({path: '/login',
              query: {redirect: "/my"}})  // 将跳转的路由path作为参数，登录成功后跳转到该路由)
            localStorage.removeItem("userId")   
            this.$store.state.userId=""
        },
        upload(){
           var rd = new FileReader();//创建文件读取对象
            var file=this.$refs.inputFile.files[0];//获取file组件中的文件
            rd.readAsDataURL(file);//文件读取装换为base64类型
            let that=this
            rd.onloadend = function(e) {
        //    console.log(e.currentTarget.result)
             that.imgurl=e.currentTarget.result
            }
             var imageType = /^image\//;
            // 是否是图片
            if(!imageType.test(file.type)) {
            alert("tupian")
                return;
            }
            var formdata = new FormData()
            formdata.append('multfile', file)
            fetch.post("/upload/headImg",formdata,"multer")
            .then((res)=>{

            })
        }
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
            width: 390px;
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
</style>
