import VueSocketIO from 'vue-socket.io'
import Vue from 'vue'
// export default socket
var connectSocket=function(){

    var userId=localStorage.getItem("userId")
    var socket=new VueSocketIO({
        debug: true,
        connection: 'ws://192.168.60.228:8083?userId='+userId,  //
    })
    Vue.use(socket)
}
export default connectSocket