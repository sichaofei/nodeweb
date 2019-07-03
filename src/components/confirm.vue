<template>
    <div class="confirm" v-if="show">
        <div class="conFom">
            确定退出登录吗？
            <div>
                <span @click="sure()">确定</span>
                <span @click="cancle()">取消</span>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data(){
        return{}
    },
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        sure(){
             this.$emit('confirm',true) 
        },
        cancle(){
              this.$emit('confirm',false) 
        }
    }
}
</script>
<style scoped>
        .confirm{
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0,0 , 0.6);
            position:fixed;
            left: 0;
            top: 0;
            z-index: 1000;
                    font-size: 18px;
        }
        .conFom{
            width: 200px;
            height: 100px;
            position:absolute;
            border-radius: 10px;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 10px 0px;
            box-sizing: border-box;
        }
         .conFom div{
             margin-top: 20px;
             display: flex;
             padding: 0 20px;
             justify-content: space-between;
         }
          .conFom div span:nth-child(1){
              color: red;
          }
</style>