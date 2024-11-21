import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Hello from "@/views/Hello.vue";
import Register from "@/views/Register.vue";
import store from '@/store'
import Music from "@/views/Music.vue";
import Recommendation from "@/views/Recommendation.vue";
import musicDetail from "@/views/musicDetail.vue";
import MyMusic from "@/views/MyMusic.vue";
import EditUserInfo from "@/views/EditUserInfo.vue";

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/login',
        // name: 'home',
        // component: Login,
        // children: [
        //     {
        //         name: 'news',
        //         path: 'news',
        //         component: News
        //     },]
        meta: { hideFooter: true },
    },
        {
            path: '/login',
            component: Login,
            meta: { hideFooter: true },
        },
        {
            path: '/register',
            component: Register,
            meta: { hideFooter: true },
        },
        {
            path: '/home',
            component: Home,
            redirect: '/home/music/all',
            children: [
                {
                    path: 'hello',
                    component: Hello
                },
                {
                    path: 'music/:category',
                    component: Music
                },
                {
                    path: 'Recommendation/:way',
                    component: Recommendation
                },
                {
                    path: 'listenCount',
                    component: MyMusic
                },
                 {
                    path: 'editInfo',
                    component: EditUserInfo
                },

            ],
            meta: {requiresAuth: true} // 这个路由需要用户登录后才能访问
        },
        {
            path: '/musicDetail/:name',
            component: musicDetail,
            meta: {requiresAuth: true} // 这个路由需要用户登录后才能访问
        },


    ]
})
router.beforeEach((to, from, next) => {
    // 检查路由是否需要认证
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // 检查用户是否已经登录
        if (!store.state.loginInfo || !sessionStorage.getItem('loginInfo')) {
            console.log(store.state)
            alert('请先登录')
            // 如果用户未登录，重定向到登录页面
            // if (this.$router.currentRoute.path !== '/login')
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            });
        } else {
            next();
        }
    } else {
        next(); // 确保一定要调用 next()
    }
});

export default router
