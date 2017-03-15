/**
 * Created by logov on 15-Mar-17.
 */

import Canvas from './comp/canvas/base'

const Home = {template: '<p>home page</p>'};
const About = {template: '<p>about page</p>'};

export default {
    routes: [
        {path: '/', component: Home},
        {path: '/about', component: About},
        {path: '/canvas', component: Canvas},
    ]
}

