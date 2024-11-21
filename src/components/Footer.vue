<template>
  <div class="footer">
    <el-footer>
      <p>{{this.$store.state.music.name}}</p>
      <audio ref="audio" :src="$store.state.musicUrl"  @loadeddata="autoPlay" @timeupdate="updateLyric" controls></audio>
      <div class="lyric">{{ currentLyric }}</div>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      lyrics: [], // 歌词数组
      currentLyric: '', // 当前歌词
    }
  },
  watch: {
    '$store.state.lrc': {
      handler(newVal, oldVal) {
        // 当 lrc 状态改变时，这个函数将被调用
        // newVal 是改变后的值，oldVal 是改变前的值
        this.parseLyrics();
      },
      deep: true,
    },
  },
  methods:{
    autoPlay(){
      console.log(this.$store.state.autoplay);
    if (this.$store.state.autoplay===true) {
      this.$refs.audio.play();
  }
  },
   updateLyric() {
  const currentTime = this.$refs.audio.currentTime;
  let lyric = this.lyrics.find((lyric) => lyric.time === currentTime);
   if (!lyric) {
    // 如果没有找到精确匹配的歌词，显示上一句歌词
    const index = this.lyrics.findIndex((lyric) => lyric.time > currentTime);
    if (index > 0) {
      this.currentLyric = this.lyrics[index - 1].text;
    }
  } else {
    this.currentLyric = lyric.text;
  }
  if (lyric) {
    this.currentLyric = lyric.text;
  }
},
    parseLyrics(){
      this.lyrics = [];
      this.currentLyric = '';
      const lines = this.$store.state.lrc.split('\n');
      for (let line of lines) {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.+)/);

        if (match) {
          const minutes = parseInt(match[1]);
          const seconds = parseFloat(match[2]);
          const text = match[3];
          this.lyrics.push({ time: minutes * 60 + seconds, text });
        }
      }
      // 按时间排序
      this.lyrics.sort((a, b) => a.time - b.time);
    },
  },
  created() {
    this.parseLyrics();
    console.log("wobeizhizaole")
    this.$store.commit('setAutoplay', false);
  },

}
</script>
<style scoped>
 .footer {
    display: flex;
    justify-content: center;
        padding-left: 0;
        height: 150px;
    position: fixed;
    bottom: 0;
  width: 100%;
  }
  audio{
  width: 500px;
  opacity: 0.5; /* 透明度，0.0 (完全透明) 到 1.0 (完全不透明) */
  }

</style>
