<template>
  <div class="home">
    <input type="text" v-model="name">
    <button @click="change">修改</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
    return{
      name:""
    }
  },
  created(){
    this.name=this.$store.state.name
  },
  methods: {
      change(){
        // console.log(this.name)
        this.$store.dispatch("changeName",this.name)
      }
  },
  computed: {
      // ...mapGetters(['username']) // 动态计算属性，相当于this.$store.getterss
  }

}
</script>
<style scoped>
  input{
    border: 1px solid black;
  }
  button{
    background: black;
  }
</style>
