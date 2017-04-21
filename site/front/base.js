import './base.less'

import Vue from 'vue/dist/vue.esm'
import ThreeCanvas from './comp/ThreeCanvas/base'

const app = new Vue({
    components: {
        'three-canvas': ThreeCanvas
    }
}).$mount('#app');



// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('/sw.js').then(function(registration) {
//             // Registration was successful
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }).catch(function(err) {
//             // registration failed :(
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }
