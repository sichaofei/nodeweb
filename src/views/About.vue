<template>
  <div class="about">
   <input type="text" v-model="username">
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
   data(){
     return{
       name:''
     }
   },
   computed:{
      ...mapGetters(['username']) 

   }
}
</script>
