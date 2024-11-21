<template>
  <body>
  <h1>个性化音乐推荐系统</h1>
 <div class="login-container">
    <h2>Login</h2>
    <form >
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="userName" name="userName" v-model="userName">
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="password">
      </div>

      <div class="input-group">
        <button @click="log" type="button" >登录</button>
      </div>
       <div class="input-group">
        <button @click="register" type="button">注册</button>
      </div>

    </form>
  </div>
  </body>
</template>

<script>
export default {
  name:'Login',
   data() {
     return {
       userName:'',
       password: ''
     }
   },
  methods:{
    log(){
      //把用户名密码发送到后端
        this.$store.commit('setLoginInfo',{
          id:'',
        })
       this.$axios.post('/api/login/', JSON.stringify({
    userName: this.userName,
    password: this.password
  }))
  .then(response => {
    if (response.data.status === 'success') {
       this.$store.commit('setLoginInfo',{
          id:response.data.user.id,
        })
      this.$router.push({
      path:'/home'
    })// 处理成功的情形
        console.log("Request succeeded");
    } else {
        // 处理错误情形
      console.log("Request failed");
        alert("用户名或密码错误，请重新输入")
      this.password=''
    }
  })
  .catch(error => {
    console.error(error);
  });
},
    register(){
      this.$router.push({
          path:'/register'
        })
    }

  },
  created() {
    sessionStorage.clear()
  }
}
</script>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 97vh;
  background-color: #ffffff;
  background-image: url("../assets/background.png");
}
h1{

}
.login-container {
  padding: 20px;
  border: 1px solid #30c5b4;
  background: linear-gradient(to right,#fbc2eb,#a6c1ee);;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 #776c70;
  width: 300px;
}

.input-group {
  margin: 10px 0;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  color: white;
  background-color: slateblue;
  cursor:pointer;
  border-radius: 5px;
}

</style>
