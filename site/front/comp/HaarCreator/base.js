/**
 * Created by logov on 15-Mar-17.
 */

import './base.less'
import template from './base.html'

export default {
    template,
    data: function () {
        return {
            mode: 'view',
            featureType: 'bw',
            features: [],
            temp: {
                feature: null
            },
            canvasStyle: {
                width: '480px',
                height: '640px',
                backgroundImage: '',
            }
        }
    },
    mounted: function () {
        this.featuresJsonToExport = [];
    },
    methods: {
        canvasMouseDown: function (event) {
            if (this.mode === 'addRect') {
                this.temp.feature = {
                    className: `haar-creator-feature-${this.featureType}`,
                    top: event.offsetY,
                    left: event.offsetX,
                    style: {
                        top: event.offsetY + 'px',
                        left: event.offsetX + 'px',
                        height: 2 + 'px',
                        width: 2 + 'px',
                    }
                };
                this.features.push(this.temp.feature);
            }
        },
        canvasMouseMove: function (event) {
            if (this.mode === 'addRect') {
                if (!this.temp.feature) return;
                this.temp.feature.style.top = Math.min(event.offsetY, this.temp.feature.top) + 'px';
                this.temp.feature.style.left = Math.min(event.offsetX, this.temp.feature.left) + 'px';
                this.temp.feature.style.height = Math.abs(event.offsetY - this.temp.feature.top) + 'px';
                this.temp.feature.style.width = Math.abs(event.offsetX - this.temp.feature.left) + 'px';
            }
        },
        canvasMouseUp: function (event) {
            if (this.mode === 'addRect') {
                let grid = getFeatureGridFromType(this.featureType);
                this.featuresJsonToExport.push({
                    type: this.featureType,
                    x: pxToNumber(this.temp.feature.style.left) / pxToNumber(this.canvasStyle.width),
                    y: pxToNumber(this.temp.feature.style.top) / pxToNumber(this.canvasStyle.height),
                    w: pxToNumber(this.temp.feature.style.width) / pxToNumber(this.canvasStyle.width),
                    h: pxToNumber(this.temp.feature.style.height) / pxToNumber(this.canvasStyle.height),
                    grid,
                });

                this.temp.feature = undefined;
            }
        },
        backImageChange: function (event) {
            let files = event.target.files;
            if (files) {
                let reader = new FileReader();
                reader.onload = e => this.canvasStyle.backgroundImage = `url(${e.target.result})`;
                reader.readAsDataURL(files[0]);
            }
        },
        clearFeatures: function () {
            this.features = [];
            this.featuresJsonToExport = [];
        },
        exportFeatures: function () {
            console.log(this.featuresJsonToExport);
            console.log(JSON.stringify(this.featuresJsonToExport));
            let dataUri = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.featuresJsonToExport));
            let a = document.createElement('a');
            a.setAttribute('href', dataUri);
            a.setAttribute('download', `Haar_features_${Math.random()}.json`);
            a.click();
        },
    },
}

function pxToNumber(px) {
    return +(px.replace('px', ''))
}

function getFeatureGridFromType(featureType) {
    switch (featureType) {
        case 'bw':
            return {wProps: [.5, .5], hProps: [.5, .5], colors: [0, 1, 0, 1]};
        case 'wb':
            return {wProps: [.5, .5], hProps: [.5, .5], colors: [1, 0, 1, 0]};
        case 'vbw':
            return {wProps: [.5, .5], hProps: [.5, .5], colors: [0, 0, 1, 1]};
        case 'vwb':
            return {wProps: [.5, .5], hProps: [.5, .5], colors: [1, 1, 0, 0]};
    }
}
