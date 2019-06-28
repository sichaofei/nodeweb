<template>
    <div id="container">
        <Header title="地图" backNum="1"/>
    </div>
</template>
<script>
import Header from '../components/header'
export default {
data(){
        return{
           map:null,
           lng:null,
           lat:null
        }
},
created(){
     let map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 10
      })
},
mounted () {
     this.init()
    
  },
  components:{
      Header
  },
  methods: {
    init () {
    let map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 10
      })
       this.ip(map)
    },
    ip(map){
    // 获取定位信息
            let that=this
            AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
                buttonPosition:'RB',    //定位按钮的停靠位置
                buttonOffset: new AMap.Pixel(0, 0),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: false,   //定位成功后是否自动调整地图视野到定位点

            });
              map.addControl(geolocation);
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                   this.lng=result.position.lng
                    this.lat=result.position.lat

                }else{
                  
                }
            });
            });
    },
  }
}
</script>
<style scoped>
        #container{
            width: 100%;
            height: 100%;
        }
</style>