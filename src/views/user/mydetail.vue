<template>
    <div class="userDetail">
        <div class="inputFileWrapper">
             <label for="inputFile">
                 <!-- <input type="file" id="inputFile" @input="upload()" ref="inputFile"/> -->
                 <input type="file" id="inputFile" @change="upload()" ref="inputFile" accept="image/*">
                 <span class="custorm-style">
                    <img :class="imgurl.length!=0?'head':'nohead'" :src="imgurl" alt="">
                     <span :class="imgurl.length==0?'left-button':'nohead'">选择头像</span>
                 </span>
             </label>
         </div>
         <div class="imglist">
             <img :src="item" alt="" v-for="(item,index) in imgList" :key="index" @click="uplateImg(item)">
         </div>
         <mt-button class="button" size="large" type="primary" v-if="imgurl.length!=0" @click="uploadClick()">确认修改</mt-button>
         <Header title="头像设置" backNum="1"/>
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
       fileImg:null,
        imgList:[],
        // 1新增 2历史
        type:1
    }
},
    beforeRouteLeave (to, from, next) {
          to.meta.keepAlive=false
          next()
    },
computed:{
...mapGetters(["userId"])
},
created(){
    this. getuserImg()
},
methods:{
     // 获取用户头像
        getuserImg(){
            let obj={userId:this.userId}
            fetch.post("/user/headImg",obj)
            .then((res)=>{
                if(res.data){
                    this.imgList=res.data.imgUrl
                    this.imgurl=""
                }
            })
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
                this.type=1
             that.imgurl=e.currentTarget.result
            }
            this.fileImg=file
           
        },
        // 点击修改
        uploadClick(){
            if(this.type==1){
                this.uploadImage()
            }else{
                this. uplateImgTrue()
            }
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
            let obj={
                imgUrl:[url],
                userId:this.userId
            }
            fetch.post("/upload/imgMongodb",obj)
            .then((res)=>{
                this.imgurl=""
                let list=this.imgList
                list.unshift(res.data.imgUrl[0])
            })
        },
        // 更改历史为默认头像
        uplateImg(item){
            this.type=2
            this.imgurl=item
        },
        uplateImgTrue(){
            let obj={userId:this.userId,imgUrl:this.imgurl}
            fetch.post("/uplate/userImg",obj)
            .then((res)=>{
                if(res.code==1){
                     this.getuserImg()
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
            height: 100px;
            display: flex;
            justify-content: center;
        }
        .inputFileWrapper .custorm-style .left-button{
            width: 100px;
            line-height: 100px;
            background: #cccccc;
            color: #fff;
            display: block;
            text-align: center;
        }.head{
            width: 100px;
            height: 100px;
            /* border-radius: 50%; */
        }
        .nohead{
            display: none
        }
        .button{
            margin-top: 200px;
            width: 50%;
            margin-left: 25%;
        }
        .imglist{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: 0 20px 0 17px;
            box-sizing: border-box;
           
        }
         .imglist img{
             width: 50px;
             height: 50px;
             margin-top: 10px;
            margin-left: 3px;
         }
</style>
