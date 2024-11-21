<template>
  <div class="container">
    <Aside class="sidebar"></Aside>
    <Header class="header"></Header>
    <Main class="content"></Main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
import Main from "@/components/Main.vue";

export default {
  name: 'Home',
  components: {
    Header,
    Aside,
    Main,
  },
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: grid;
  grid-template-areas:
            "sidebar header"
            "sidebar content";
  grid-template-columns: 2fr 9fr;
  grid-template-rows: 1fr 9fr;
  height: 97vh;
    background-image: url('../assets/background3.jpg');
  background-size: cover;
  background-position: center;
}

.content {
  grid-area: content;
  padding-left: 0;
  height: 500px;
  overflow: auto;
  align-self: start;

  /* 其他样式... */
}
/* 针对滚动条的轨道部分，可以完全透明或设置透明度 */
::-webkit-scrollbar-track {
  background: transparent; /* 完全透明的轨道背景 */
}

/* 针对滚动条的滑块部分，也可以设置为透明 */
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5); /* 半透明的滑块 */
}

/* 调整滚动条大小 */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}
</style>
