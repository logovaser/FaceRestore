/**
 * Created by logov on 20-Mar-17.
 */

import '../../lib/OBJLoader'
import '../../lib/MTLLoader'

export function initScene() {
    return new Promise(resolve => {
        let loaders = [];
        let scene = new THREE.Scene();

        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;

        let light = new THREE.PointLight(0xffffff, 1.5, 200);
        light.position.set(0, 50, 50);
        scene.add(light);

        let light2 = new THREE.PointLight(0xffffff, 1, 200);
        light2.position.set(-50, -50, 50);
        scene.add(light2);

        let skullGroup;
        loaders.push(new Promise(res => {
            let objLoader = new THREE.OBJLoader();
            objLoader.setPath('/res/');
            objLoader.load('skull.obj', object => {
                object.traverse(function (child) {
                    if ((child instanceof THREE.Mesh)) {
                        child.geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                        child.material = new THREE.MeshPhongMaterial({color: 0xffffff});
                    }
                });
                scene.add(object);
                skullGroup = object;
                res();
            });
        }));

        let eyeSample;
        loaders.push(new Promise(res => {
            let mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath('/res/');
            mtlLoader.load('eyeball.mtl', function (materials) {
                materials.preload();

                let objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('/res/');
                objLoader.load('eyeball.obj', function (object) {
                    eyeSample = object;
                    eyeSample.name = 'eyeSample';
                    res();
                });
            });
        }));

        let skinnedHead;
        loaders.push(new Promise(res => {
            let loader = new THREE.JSONLoader();
            loader.load('/res/head_rigged.json', function (geometry) {

                // mesh.skeleton.bones.forEach(bone => {
                //     if (bone.name === 'nose') {
                //         bone.rotation.z = 0.3;
                //     }
                // });
                skinnedHead = new THREE.SkinnedMesh(
                    geometry,
                    new THREE.MeshPhongMaterial({color: 0xF7E4C5, skinning: true})
                );
                res();

            });
        }));

        Promise.all(loaders).then(() => resolve({scene, camera, skullGroup, eyeSample, skinnedHead}))

    });
}

export function resizeRenderer(renderer, canvas, camera) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
}

export function initRenderer(canvas, scene, camera) {
    let renderer = new THREE.WebGLRenderer({
        canvas,
        preserveDrawingBuffer: true
    });

    let render = () => {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };
    render();

    return renderer;
}
