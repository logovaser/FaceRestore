/**
 * Created by logov on 15-Mar-17.
 */

import 'babylonjs/babylon'
import '../../lib/babylon.objFileLoader'
import '../../../res/test.obj'
import '../../../res/test.mtl'
import './base.less'
import Template from './base.html'

export default {
    data: function () {
        return {
            scene: {},
        }
    },
    mounted: function () {
        let canvas = this.$refs.renderCanvas;
        let engine = new BABYLON.Engine(canvas, true);
        let createScene = () => {
            let scene = new BABYLON.Scene(engine);
            let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
            camera.setTarget(BABYLON.Vector3.Zero());
            camera.attachControl(canvas, false);
            // create a basic light, aiming 0,1,0 - meaning, to the sky
            let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(-1, 1, -1), scene);
            // create a built-in "sphere" shape; its constructor takes 5 params: name, width, depth, subdivisions, scene
            // let sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
            // move the sphere upward 1/2 of its height
            // sphere.position.y = 1;

            let ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);


            let loader = new BABYLON.AssetsManager(scene);
            let testObj = loader.addMeshTask("test", "", "/static/", "test.obj");
            testObj.onSuccess = t => {
                t.loadedMeshes.forEach(m => {
                    m.rotation = new BABYLON.Vector3(0, Math.PI, 0);
                    m.position.y = 1;
                });
            };
            loader.load();

            return scene;
        };

        this.scene = createScene();

        engine.runRenderLoop(() => {
            this.scene.render();
        });

        window.addEventListener('resize', function () {
            engine.resize();
        });

        // scene.render();

    },
    methods: {
        onClick: function () {
            let scene = this.scene;
            let pickResult = scene.pick(scene.pointerX, scene.pointerY);

            console.dir(pickResult);
        }
    },

    template: Template,
}
