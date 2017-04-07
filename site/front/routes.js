/**
 * Created by logov on 15-Mar-17.
 */

// import Canvas from './comp/canvas/base'
import FaceRestore from './pages/FaceRestore/base'

const Home = {template: '<p>home page</p>'};
const About = {template: '<p>about page</p>'};

export default {
    // mode: 'history',
    routes: [
        {path: '/', component: Home},
        {path: '/about', component: About},
        // {path: '/canvas', component: Canvas},
        {path: '/face_restore', component: FaceRestore},
    ]
}

