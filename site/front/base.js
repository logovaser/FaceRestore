import Vue from 'vue/dist/vue.esm'
import VueRouter from 'vue-router/dist/vue-router.esm'
import Routes from './routes'

const router = new VueRouter(Routes);
Vue.use(VueRouter);

const app = new Vue({
    router
}).$mount('#app');
