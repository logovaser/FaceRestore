import './base.less'

import Vue from 'vue/dist/vue.esm'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import router from './router'

const app = new Vue({
    router,
}).$mount('#app');

// import initSW from './sw/initServiceWorker'
// import askPush from './sw/requestPushNotifPermission'
//
// initSW.then(registration => {
//
//     askPush(registration).then(() => {
//         // setTimeout(() => {
//         //     registration.showNotification('test 2', {
//         //         "body": "Hi there 2",
//         //         "vibrate": [10, 100, 20, 100, 30, 100, 40]
//         //     });
//         // }, 10000);
//     });
//
// });
