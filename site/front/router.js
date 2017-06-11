/**
 * Created by logov on 05-May-17.
 */

import VueRouter from 'vue-router'
import ThreeCanvas from './comp/ThreeCanvas/base'
import HaarCreator from './comp/HaarCreator/base'

export default new VueRouter({
    routes: [
        {path: '/', component: ThreeCanvas},
        {path: '/haar_creator', component: HaarCreator},
    ]
});
