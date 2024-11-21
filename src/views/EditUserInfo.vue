<template>
  <div class="edit-user-info">
    <h1>修改用户信息</h1>
    <el-form :model="form">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="update(form)">更新信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '',
        username: '',
        password: '',
        phone: '',
      },
    }
  },
  methods: {
    update(form) {
      // 这里的代码与您在 Header 组件的 update 方法类似
      this.$axios.post('/api/update/', JSON.stringify(form)).then(response => {
        if (response.data.status === 'success') {
          this.$message.success("更新成功");
          // 可能还需要更新用户状态或重定向
        } else {
          this.$message.error("更新失败");
        }
      })
    },
    openMusic(music) {
        this.$store.commit('setMusicUrl', music);
      this.$axios.post('/api/listen/', JSON.stringify({
        musicName: this.$store.state.music.name,
        id: this.$store.state.loginInfo.id,
      }))
          .then(function () {
            console.log('发送成功了');
          })
          .catch(function (error) {
            console.log(error);
          });
      this.$axios.get('/api/media/', { params:{
          url: music.url,
        },responseType: 'blob' })
        .then(response => {
            var url = URL.createObjectURL(response.data);
            this.$store.commit('setUrl', url);
        })
        .catch(error => console.error(error));
    },
    autoPlay(music) {
      this.$store.commit('setAutoplay', true);
      this.openMusic(music)
    },
  },
  created() {
    if(this.$store.state.music) {
      if(this.$store.state.isChange!==true){
      this.openMusic(this.$store.state.music)
      this.$store.commit('setChange', true);
      }
    }
    // 与 Header 组件的 created 钩子中的代码相同
    this.$axios.get('/api/searchById/', {
      params: {
        id: this.$store.state.loginInfo.id
      }
    }).then(response => {
      if (response.data.status === 'success') {
        this.form = response.data.user;
      } else {
        this.$message.error("获取用户信息失败");
      }
    })
  }
}
</script>

<style scoped>
.edit-user-info {
  max-width: 600px;
  margin: 50px auto;
}
</style>
