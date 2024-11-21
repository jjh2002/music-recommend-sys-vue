<template>
  <body>
  <h1>个性化音乐推荐系统</h1>
  <div class="register-container">
    <h2>Register</h2>
<form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="userName" name="userName" v-model="username">
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="password">
        </div>
        <div class="input-group">
        <label for="password">Password Again</label>
        <input type="password"  v-model="confirmPassword">
        </div>
        <div class="input-group">
        <label>Phone</label>
        <input  v-model="phone"  />

      </div>
      <div class="input-group">
         <button type="submit">注册</button>
      </div>

    </form>
  </div>
</body>
</template>

<script>
export default {
name:'Register',
  data() {
        return {
          username:'',
          password: '',
          confirmPassword:'',
          phone:'',
        }
      },
  methods: {
    submitForm() {
      // 验证用户名
      const usernamePattern = /^[a-zA-Z0-9]{6,}$/; // 用户名至少需要6个字符，只能包含字母和数字
      if (!this.username || !usernamePattern.test(this.username)) {
        alert('用户名至少需要6个字符，只能包含字母和数字');
        return;
      }

      // 验证密码
      const passwordPattern = /^[a-zA-Z0-9]{8,}$/; // 密码至少需要8个字符，只能包含字母和数字
      if (!this.password || !passwordPattern.test(this.password)) {
        alert('密码至少需要8个字符，只能包含字母和数字');
        return;
      }
      // 密码确认
      if(this.password!==this.confirmPassword){
        alert('两次密码不一致');
        return;
      }
      // 验证手机号
      const phonePattern = /^1[3456789]\d{9}$/; // 手机号需要符合中国大陆的手机号格式
      if (!this.phone || !phonePattern.test(this.phone)) {
        alert('请输入有效的手机号');
        return;
      }

      // 在这里处理表单提交
      this.$axios.post('/api/register/', JSON.stringify({
        username: this.username,
        password: this.password,
        phone: this.phone
      }))
      .then(response => {
        console.log(response.data)
        if (response.data.status === 'true') {
          alert("注册成功");
          this.$router.push({
            path:'/'
          });
        }
        else {
          alert("用户名已存在，请重新输入");
          this.username = '';
        }
      });
    },
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
.register-container{
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
