/**
 * Created by logov on 20-Mar-17.
 */

export function initScene() {
    return new Promise((resolve, reject) => {
        let scene = new THREE.Scene();

        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;

        let light = new THREE.PointLight(0xffffff, 2, 200);
        light.position.set(50, 50, 50);
        scene.add(light);

        let light2 = new THREE.PointLight(0xffffff, 1, 200);
        light2.position.set(-50, -50, 50);
        scene.add(light2);

        let objLoader = new THREE.OBJLoader();
        objLoader.setPath('/static/');
        objLoader.load('skull.obj', object => {
            object.traverse(function (child) {
                if ((child instanceof THREE.Mesh)) {
                    child.geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                    child.material = new THREE.MeshPhongMaterial();
                }
            });
            scene.add(object);

            resolve({scene, camera, skullGroup: object});
        });
    });
}

export function resizeRenderer(renderer, canvas, camera) {
    camera.aspect = canvas.clientWidth / canvas.clientWidth;
    camera.updateProjectionMatrix();

    renderer.setSize(canvas.clientWidth, canvas.clientWidth);
}

export function initRenderer(canvas, scene, camera) {
    let renderer = new THREE.WebGLRenderer({canvas});

    let render = () => {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };
    render();

    return renderer;
}
