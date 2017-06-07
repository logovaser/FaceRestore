import './base.less'

import Vue from 'vue/dist/vue.esm'
import ThreeCanvas from './comp/ThreeCanvas/base'

const app = new Vue({
    components: {ThreeCanvas}
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
