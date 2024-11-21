<template>
  <div>
   <img src="http://localhost:8000/static/2.jpg" alt="">
    <audio src="http://localhost:8000/static/1.mp3" controls></audio>
    <button>rock</button>
    <!--添加新用户     -->
    <div class="input-group">
      <label for="username">添加用户</label>
        <el-dialog :visible.sync="addDialogVisible" title="添加新用户">
      <el-form :model="addForm">
        <el-form-item label="用户名">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible= false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
      <button @click="openAddDialog">添加</button>
    </div>
    <button @click="cors">诗歌展示</button>
    <h1>{{ poem }}</h1>
    <button @click="sendPoem">诗歌发送</button>
    <button @click="show">展示列表</button>
    <div>
      <input v-model="searchUsername" placeholder="Search by username">
      <button @click="search">Search</button>
    </div>
    <el-table
        :data="userList"
        border
        style="width: 100%">
      <el-table-column
          prop="username"
          label="用户名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="手机号">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="180">
      </el-table-column>
      <el-table-column
          label="操作"
          width="180">
        <template v-slot:default="scope">
          <el-button type="primary" size="small" @click="openDialog(scope.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="修改用户信息">
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
    <el-pagination
        layout="prev, pager, next,jumper"
        :total="this.pageTotal"
        @current-change="handlePageChange">
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Hello',
  data() {
    return {
      poem: '',
      poem1: '欲穷千里目，更上一层楼',
      username: '',
      password: '',
      phone: '',
      userList: [],
      currentPage: 1,
      pageSize: 10,
      pageTotal: 1,
      searchUsername: '',
      isSearch: false,
      form: {
        id: '',
        username: '',
        password: '',
        phone: '',
      },
      addForm: {
        username: '',
        password: '',
        phone: '',
      },
      addDialogVisible: false,
      dialogVisible: false,
    }
  },
  methods: {
    cors() {
      this.$axios.get('/api/poem/')
          .then(response => {
            // 在这里，你可以将 response.data.poem 显示在你的页面上
            console.log('到达了')
            console.log(response.data.poem);
            this.poem = response.data.poem;
          })
          .catch(error => {
            console.error(error);
          });
    },
    sendPoem() {
      this.$axios.post('/api/poem1/', JSON.stringify({
        APoem: this.poem1
      }))
          .then(function () {
            console.log('发送成功了');
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    show() {
      this.isSearch = false;
      this.$axios.get('/api/show/', {
        params: {
          page: this.currentPage,
          size: this.pageSize
        }
      }).then(response => {
        this.pageTotal = response.data.count
        this.userList = response.data.data
        console.log(this.userList)
      })
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      if (this.isSearch) {
        this.search()
      } else
        this.show();
    },
    search() {
      this.isSearch = true;
      this.$axios.get('/api/search/', {
        params: {
          page: this.currentPage,
          size: this.pageSize,
          username: this.searchUsername,
        }
      }).then(response => {
        this.pageTotal = response.data.count
        this.userList = response.data.data
      })
    },
    update(form) {
      //   根据用户id更新用户信息
      this.$axios.post('/api/update/', JSON.stringify({  // 传递参数
        id: form.id,
        username: form.username,
        password: form.password,
        phone: form.phone
      })).then(response => {
        if (response.data.status === 'success') {
          alert("更新成功");
          this.show();
        } else {
          alert("更新失败");
        }
      })
    },
    deleteUser(id) {
      this.$axios.post('/api/delete/', JSON.stringify({  // 传递参数
        id: id,
      })).then(response => {
        if (response.data.status === 'success') {
          alert("删除成功");
          this.show();
        } else {
          alert("删除失败");
        }
      })
    },
    add() {
      this.$axios.post('/api/add/', JSON.stringify({  // 传递参数
        username: this.addForm.username,
        password: this.addForm.password,
        phone: this.addForm.phone
      })).then(response => {
        if (response.data.status === 'success') {
          alert("添加成功");
          this.show();
          this.addDialogVisible = false;
          this.addForm.username = '';
          this.addForm.password = '';
          this.addForm.phone = '';
        } else if (response.data.status === 'error') {
          // 显示后端返回的错误信息
          alert(response.data.error);
        }
      }).catch(error => {
        // 处理网络或其他错误
        console.error(error);
      });
    },
    openDialog(row) {
      this.form = {...row};
      this.dialogVisible = true;
    },
    openAddDialog() {
      this.addDialogVisible = true;
    },
    listen(musicName) {
      this.$axios.post('/api/listen/', JSON.stringify({
        musicName: musicName,
        id: this.$store.state.loginInfo.id,
      }))
          .then(function () {
            console.log('发送成功了');
          })
          .catch(function (error) {
            console.log(error);
          });
    },
  }
}
</script>

<style>

</style>
