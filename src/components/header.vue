<template>
    <div class="header">
        <div class="back" @click="back">返回</div>
        <div class="title">{{title}}</div>
    </div>
</template>
<script>
export default {
    props:{
        title:String,
        backNum:String
        },
        created(){
            
            console.log(this.$route.matched)
        },
    methods:{
        back(){
            if(this.backNum=="index"){
                this.$router.push("/index")
                return
            }
            this.$router.go(-(this.backNum))
        }
    }
}
</script>
<style scoped>
    .header{
        width: 100%;
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        background: white;
        color: black;
        font-size: 16px;
        display: flex;
        z-index: 1000;
    }
    .header div{
        text-align:center;
        line-height: 50px;
    }
    .back{
        width: 20%;
        position: absolute;
        left: 0;
      top: 0;
    }
    .title{
        width: 100%;

    }
</style>
