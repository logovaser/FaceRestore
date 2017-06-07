/**
 * Created by logov on 15-Mar-17.
 */

import './base.less'
import template from './base.html'

import 'three/build/three'

import ModeIndicator from '../modeIndicator/base'
import SideMenu from '../sideMenu/base'
import Toolbox from '../toolbox/base'

import data from './data'
import watch from './watch'
import mounted from './mounted'
import methods from './methods'

export default {
    components: {ModeIndicator, SideMenu, Toolbox},
    template,
    data,
    watch,
    mounted,
    methods,
}
