<template>
  <div class="header">
    <h1>个性化音乐推荐系统</h1>
    <el-header style="text-align: right;display: flex;align-items: center; ">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu >
        <el-dropdown-item @click.native="openDialog">修改信息</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
       <el-dialog :visible.sync="dialogVisible" title="修改用户信息" style="text-align: left">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible= false">取 消</el-button>
      <el-button type="primary" @click="update(form)">确 定</el-button>
    </span>
    </el-dialog>
    <span>{{form.username}}</span>
  </el-header>
</div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      id:'',
       dialogVisible: false,
      form: {
        id: '',
        username: '',
        password: '',
        phone: '',
      },
    }
  },
  methods:{
      openDialog(){
      this.dialogVisible = true;
      console.log(this.dialogVisible)
    },
    logout() {
        this.$router.push({ path: '/login' });
    this.$store.commit('logout');

  },
    update(form) {
      //   根据用户id更新用户信息
      this.$axios.post('/api/update/', JSON.stringify({  // 传递参数
        id: this.$store.state.loginInfo.id,
        username: form.username,
        password: form.password,
        phone: form.phone
      })).then(response => {
        if (response.data.status === 'success') {
          this.$message.success("更新成功");
          this.dialogVisible = false;
        } else {
          this.$message.error("更新失败");
        }
      })
    },

  },
  computed:{

  },
  created() {
    // 根据用户id获取用户信息
    this.$axios.get('/api/searchById/', {
      params: {
        id: this.$store.state.loginInfo.id
      }
    }).then(response => {
      if (response.data.status === 'success') {
        this.form= response.data.user;
        console.log(this.form)
      } else {
        alert("获取用户信息失败");
      }
    })
  }
}
</script>

<style scoped>
 .header {
   display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
        grid-area: header;
        padding-left: 20px;
   height: 50px;
    }
</style>
