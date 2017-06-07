/**
 * Created by logov on 15-Mar-17.
 */

import './base.less'
import template from './base.html'


import multiToggle from '../multiToggle/base'

export default {
    template,
    props: ['config'],
    components: {multiToggle},
    methods: {
        emit: function (eventType) {
            this.$emit(eventType)
        },

        rotateMesh: function (direction) {
            this.$emit('rotateMesh', direction)
        }
    }
}
