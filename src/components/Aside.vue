<template>
  <div class="sidebar">
    <el-aside class="el-aside" style="padding: 0;width: auto;">
      <el-menu :default-openeds="['2','3']" router background-color=rgba(0,0,0,0)>
        <el-submenu index="1">
          <template #title><i class="el-icon-message"></i>音乐分类</template>
          <el-menu-item-group>
            <template #title></template>
            <el-menu-item
                v-for="(category, index) in categories"
                :key="index"
                :index="`/home/music/${category}`"
            >
              {{ category }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template #title><i class="el-icon-menu"></i>音乐推荐</template>
          <el-menu-item-group>
            <template #title></template>
            <el-menu-item
                v-for="(way, index) in ways_dict"
                :key="way"
                :index="`/home/recommendation/${way}`"
            >
              {{ index }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template #title><i class="el-icon-setting"></i>用户中心</template>
          <el-menu-item-group>
            <el-menu-item index="/home/listenCount">我听过的</el-menu-item>
            <el-menu-item index="/home/editInfo">信息修改</el-menu-item>
            <el-menu-item @click="logout">退出登录</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data() {
    return {
      categories: ['all', 'pop', 'rock', 'jazz', 'classical', 'folk', 'country', 'blues', 'hiphop', 'heavy_metal', 'electronic'],
      ways: ['hot', 'old', 'new'],
      ways_dict: {
        '热歌推荐': 'hot',
        '老歌拾遗': 'old',
        '新歌速览': 'new',
        '个性推荐': 'personal',
      }
    };

  },
  methods: {
       logout() {
        this.$router.push({ path: '/login' });
    this.$store.commit('logout');

  },
  }
}
</script>

<style scoped>
.sidebar {
  overflow: auto;
  grid-area: sidebar;
  padding: 0;
  background-image: url('../assets/background1.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative; /* 为伪元素定位设置参考 */
}

.sidebar::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(246, 241, 241, 0.5);
  pointer-events: none; /* 确保不会影响到下层的点击事件 */
}

::-webkit-scrollbar {
  display: none;
}
</style>
