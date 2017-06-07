/**
 * Created by logov on 19-May-17.
 */

import {initScene, initRenderer, resizeRenderer} from './threeJsInit'

export default function () {
    initScene().then(res => {
        this.mouse = new THREE.Vector2();
        this.scene = res.scene;
        this.camera = res.camera;
        this.skullGroup = res.skullGroup;
        this.eyeSample = res.eyeSample;
        this.skinnedHead = res.skinnedHead;
        this.points = [];
        this.addedObjects = [];

        this.renderer = initRenderer(this.$refs.renderCanvas, this.scene, this.camera);
        resizeRenderer(this.renderer, this.$refs.renderWrapper, this.camera);
        window.addEventListener('resize', () => {
            resizeRenderer(this.renderer, this.$refs.renderWrapper, this.camera);
        })
    });
}
