<template>
  <div id="app">

      <router-view></router-view>

    <Footer v-if="!$route.meta.hideFooter"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
export default {
  name: 'App',
  components: {
    Footer,
  },
   created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
        this.$store.commit('setUrl', '');

      console.log(this.$store.state.music)
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
        this.$store.commit('setChange', false);
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
   watch: {
     $route(to, from) {
       if (!this.$store.state.loginInfo){

       }
     },
   }
}
</script>
<style>
app{
 height: 1000px;
}
</style>
