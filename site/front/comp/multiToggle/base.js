/**
 * Created by logov on 23-May-17.
 */

import './base.less'
import template from './base.html'

export default {
    template,
    data: function () {
        return {
            point: {position: '0%'},
            sections: [1,2,3]
        }
    },
    methods: {
        sectionClick: function (index) {
            this.point.position = 100 / this.sections.length * index + '%';
            this.updateValue(index);
        },
        updateValue: function (value) {
            this.$emit('input', value)
        }
    }
}
