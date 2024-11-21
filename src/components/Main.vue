<template>
  <div class="content">
  <router-view></router-view>
    </div>
</template>

<script>
export default {
name:'Container'
}
</script>

<style>
.content {
        grid-area: content;
        padding-left: 0;
        height: 550px;
        overflow: auto;
        align-self: start;
    /* 其他样式... */
    }
</style>
