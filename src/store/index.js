import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginInfo: JSON.parse(sessionStorage.getItem('loginInfo')) || null,
        music: '',
        lrc: '',
        musicUrl: '',
        autoplay: false,
        isChange: true,
        row: '',
    },
    getters: {},
    mutations: {
        setLoginInfo(state, info) {
            state.loginInfo = info;
            sessionStorage.setItem('loginInfo', JSON.stringify(info));
        },
        setUrl(state, url) {
            state.musicUrl = url;
        },
        logout(state) {
            state.music = '',
                state.lrc = '',
                state.musicUrl = '',
                state.autoplay = false,
                state.isChange = true,
                state.row = '',
            localStorage.clear();
            sessionStorage.clear();
        },
        setMusicUrl(state, music) {
            state.music = music;

            // 获取歌词
            fetch(music.lyric_url)
                .then(response => response.text())
                .then(data => {
                    // 存储歌词到 Vuex store
                    state.lrc = data;
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        setAutoplay(state, autoplay) {
            state.autoplay = autoplay;
        },
        setChange(state, isChange) {
            state.isChange = isChange;
        },
        setRow(state, row) {
            state.row = row;
        }
    },

    actions: {},
    modules: {}
})
