<template>
  <div class="container" >
    <div class="top">
      <div class="button-container">
        <el-button class="custom-button-danger" size="small" @click="goBack">返回</el-button>
        <el-button class="custom-button-primary" size="small" @click="autoPlay($store.state.row)">播放</el-button>
      </div>
      <div class="lyricStyle">
    <h1 class="centered">{{ this.$store.state.row.name }}</h1>
        <pre ><h1>歌词:</h1>{{ lyric }}
        </pre>
        </div>
       <div class="comments">
         <el-table
        :data="musicList"
        border
        style="width: 100%">
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
          width="180">
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
         <h1>评论:</h1>
  <div class="add-comment">
    <textarea v-model="newComment" placeholder="写下你的评论..."></textarea>
    <button @click="submitComment">发表评论</button>

       <div class="comment" v-for="comment in comments" :key="comment.id">
    <p><strong style="padding-right: 10px;">{{ comment.username }} :</strong>     {{ comment.content }}</p>
    <!-- 只有当用户是评论的作者时，才显示删除按钮 -->
<i
    class="el-icon-s-opportunity"
    :class="{ 'liked-icon': comment.is_liked }"
    @click="toggleLike(comment)"
  ></i>赞:{{ comment.count }}
    <button v-if="comment.user === $store.state.loginInfo.id" @click="deleteComment(comment.id)">删除</button>
         <div class="comment-footer">
        <span class="comment-time">{{ comment.time }}</span>
      </div>
  </div>
    </div>
    </div>

    </div>


  <!-- 展示评论 -->

    <div class="bottom">
        <img :src="this.$store.state.row.pic_url" class="background-image" alt="">
</div>

  </div>

</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      like: true,
      lyric: '',
      musicList: [],
      comments: [],
      newComment: '',
    }
  },

  created() {
      if(this.$store.state.music) {
      if(this.$store.state.isChange!==true){
      this.openMusic(this.$store.state.music)
      this.$store.commit('setChange', true);
      }
    }
    this.showComments()
    this.fetchSimilarity();
    this.fetchLyric();
  },
  computed: {

  },
  components: {},
  methods: {
  autoPlay(music) {
      this.$store.commit('setAutoplay', true);
      this.openMusic(music)
    },
    likeMusic(row) {
      this.$store.commit('setRow', row)
      this.$router.push({path:`/musicDetail/${row.name}`} );
    },
    goBack() {
      this.$router.push({ path: '/Home' });
    },
     fetchLyric() {
    fetch(`${this.$store.state.row.lyric_url}`)
      .then(response => response.text())
      .then(data => {
        this.lyric = data;
      });
  },
    fetchSimilarity() {
      this.$axios.get('/api/similar_music/', {
        params: {
          musicId: this.$store.state.row.id,
        }
      }).then(response => {
        this.musicList = response.data.data
        console.log(this.musicList,'hahahaah')
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
    submitComment() {
      this.$axios.post('/api/comment/', JSON.stringify({
        musicId: this.$store.state.row.id,
        comment: this.newComment,
        userId: this.$store.state.loginInfo.id,
      }))
        .then(response => {
          if (response.data.status === 'success') {
            this.comments.push({
              user: this.$store.state.loginInfo.username,
              content: this.newComment,
            });
            this.newComment = '';
            this.showComments();
          } else {
            alert('评论失败');
          }
        });
    },
    showComments() {
      this.$axios.get('/api/showComment/', {
        params: {
          musicId: this.$store.state.row.id,
          userId: this.$store.state.loginInfo.id,
        }
      })
        .then(response => {
          this.comments = response.data.data;
        });
    },
    deleteComment(commentId) {
      this.$axios.post('/api/deleteComment/', JSON.stringify({
        commentId: commentId,
      }))
        .then(response => {
          if (response.data.status === 'success') {
            this.showComments();
          } else {
            alert('删除失败');
          }
        });
    },
    toggleLike(comment){
       this.$axios.post('/api/commentLike/', {
  commentId: comment.id,
  userId: this.$store.state.loginInfo.id
}).then(response => {
  this.showComments();
}).catch(error => {
  console.error('Error when toggling like:', error);
});
    }
  },
  watch: {
  '$store.state.row': {
    handler(newVal, oldVal) {
      this.fetchLyric();
      this.fetchSimilarity();
      this.showComments();
    },
    deep: true,
  },
},
}
</script>

<style scoped>
.top{
   background-color: rgba(245, 245, 245, 0.5);
  overflow: auto;
   position: absolute;
  z-index: 0;
   display: flex;
  justify-content: flex-start;
  align-items: center;
   flex-direction: column;
  height: 97vh;
  width: 97vw;
::-webkit-scrollbar {
  display: none;

}
}
.bottom {
  position: absolute;
  z-index: -1;
}
.background-image{
  width: 97vw;
  height: 97vh;
   object-fit: fill;

}
.lyricStyle{
  overflow: auto;
  height: 500px;

}
.centered{
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 50px;
  color: #000000;
}
.comments{
  position: absolute;
  z-index: 0;
 width:800px;
  top:600px

}
.add-comment {
  margin-top: 20px;
  margin-bottom: 150px;
}

.add-comment textarea {
  width: 90%;
  margin-bottom: 50px;
}

.add-comment button {
  float: right;
}
.comment {
  margin-bottom: 20px; /* 增加间隔 */
  padding: 15px; /* 内填充提供空间感 */
  background-color: #f9f9f9; /* 背景色 */
  border-radius: 10px; /* 边角圆滑 */
  border: 1px solid #eaeaea; /* 边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 轻微阴影效果 */
}
.comment button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: -20px;
  padding: 5px 5px;
  cursor: pointer;
  margin-left: 20px; /* 或者您需要的距离 */
  float: right; /* 让按钮靠右 */
}

.comment button:hover {
  background-color: #ff7875;
}
.comment p {
  margin: 0; /* 去除默认的margin */
  color: #333; /* 文字颜色 */
  font-size: 16px; /* 调整整体段落字体大小 */
}
.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-time {
  font-size: 0.8em;
  color: #666;
}
.comment p:first-child {
  font-weight: bold; /* 突出显示用户名称 */
  margin-bottom: 10px; /* 在用户名和评论内容之间增加一些间隔 */
}
.custom-button-primary {
  background-color: #409eff; /* 主按钮背景颜色 */
  color: white; /* 文字颜色 */
}

.custom-button-danger {
  background-color: #ffd875; /* 危险按钮背景颜色 */
  color: white; /* 文字颜色 */
}

/* 按钮容器样式 */
.button-container {
  display: flex;
  justify-content: space-around; /* 按钮分布在容器中间 */
  margin-bottom: 20px; /* 与下方元素的间隔 */
}
/* 默认情况下，图标是灰色 */
.el-icon-s-opportunity {
  color: grey; /* 默认的图标颜色为灰色 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

/* 当评论被点赞后图标变红 */
.liked-icon {
  color: red; /* 点赞状态下的图标颜色为红色 */
}
</style>
