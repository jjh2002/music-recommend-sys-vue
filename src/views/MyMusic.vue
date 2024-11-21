<template>
  <div >
    <el-table
        :data="musicList"
        border
        style="width: 100%;">
      <el-table-column
          prop="name"
          label="歌曲名"
          width="180">
                <template slot-scope="scope">
          <span>
            <img :src="scope.row.pic_url" alt="" style="width: 50px;height: 50px">
            {{scope.row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column
          prop="singer"
          label="歌手">
      </el-table-column>
      <el-table-column
          prop="category"
          label="类别"
          width="90">

      </el-table-column>

      <el-table-column
          prop="count"
          label="播放次数"
          width="90">

      </el-table-column>
      <el-table-column
          label="操作"
          width="180">
        <template v-slot:default="scope">
          <el-button type="primary" size="small" @click="autoPlay(scope.row)" >播放</el-button>
          <el-button type="danger" size="small" @click="likeMusic(scope.row)">详情</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
        layout="prev, pager, next,jumper"
        :total="this.pageTotal"
        @current-change="handlePageChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Music',
  data() {
    return {
      musicList: [],
      pageTotal: 0,
      currentPage: 1,
      pageSize: 10,
      category: '',
      musicName:'',
      isSearch: false,
    }

  },
  methods:{
    handlePageChange(newPage) {
      this.currentPage = newPage;
      if (this.isSearch) {
        this.search()
      } else
        this.show();
    },
    show(){
       this.isSearch = false;
      this.$axios.get('/api/myMusic/', {
        params: {
          page: this.currentPage,
          size: this.pageSize,
          id: this.$store.state.loginInfo.id,
        }
      }).then(response => {
        this.pageTotal = response.data.count
        this.musicList = response.data.data
        console.log(this.musicList)
      })
    ;
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
    likeMusic(row) {
      this.$store.commit('setRow', row)
      console.log(row)
      this.$router.push({path:`/musicDetail/${row.name}`} );
    },
    search() {
      this.isSearch = true;
      this.$axios.get('/api/searchByName/', {
        params: {
          page: this.currentPage,
          size: this.pageSize,
          musicName: this.musicName,
        }
      }).then(response => {
        this.pageTotal = response.data.count
        this.musicList = response.data.data
      })
    },
  },
  created() {
    console.log(this.$store.state.isChange)
    if(this.$store.state.music) {
      if(this.$store.state.isChange!==true){
      this.openMusic(this.$store.state.music)
      this.$store.commit('setChange', true);
      }
    }
      this.isSearch = false;
      this.$axios.get('/api/myMusic/', {
        params: {
          page: this.currentPage,
          size: this.pageSize,
          id:this.$store.state.loginInfo.id
        }
      }).then(response => {
        this.pageTotal = response.data.count
        this.musicList = response.data.data
        console.log(this.musicList)
      })
      ;  // 输出 category 参数的值
  },
  computed: {
  },
  watch: {
    $route(newValue, oldValue) {
       this.isSearch = false;
      this.$axios.get('/api/myMusic/', {
        params: {
          page: this.currentPage,
          size: this.pageSize,
          id:this.$store.state.loginInfo.id
        }
      }).then(response => {
        this.pageTotal = response.data.count
        this.musicList = response.data.data
        console.log(this.musicList)
      })
    ;
    }
  }
}
</script>

<style scoped>
/deep/ .el-table, /deep/ .el-table__expanded-cell{
  background-color: transparent;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
/* 针对整个表格设置透明边框，移除边框 */
/deep/ .el-table,
/deep/ .el-table__expanded-cell,
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  border: none !important; /* 移除边框 */
}

/deep/ .el-table .el-table__body tr td,
/deep/ .el-table .el-table__header tr th {
  border-bottom: none !important; /* 移除横向分割线 */
}

/deep/ .el-table .el-table__body tr td:first-child,
/deep/ .el-table .el-table__header tr th:first-child {
  border-left: none !important; /* 移除单元格左侧边框 */
}

/deep/ .el-table .el-table__body tr td:last-child,
/deep/ .el-table .el-table__header tr th:last-child {
  border-right: none !important; /* 移除单元格右侧边框 */
}
/deep/ .el-table .el-table__cell {
  color: #000000;
}
</style>
