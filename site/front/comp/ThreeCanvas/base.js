/**
 * Created by logov on 15-Mar-17.
 */

import 'three/build/three'
import '../../lib/OBJLoader'

import Triangulate from 'delaunay-triangulate';

import '../../../res/skull.obj'
import './base.less'
import Template from './base.html'

import {initScene, initRenderer, resizeRenderer} from './threeJsInit'

function lengthenVector(vector, length) {
    return vector.multiplyScalar(length / vector.length() + 1);
}

export default {

    data: function () {
        return {
            mouse: new THREE.Vector2(),
            camera: {},
            scene: {},
            renderer: {},

            skullGroup: {},

            config: {
                age: 15,
                fat: 30
            }
        }
    },

    mounted: function () {

        initScene().then(res => {
            this.scene = res.scene;
            this.camera = res.camera;
            this.skullGroup = res.skullGroup;
            this.points = [];

            this.renderer = initRenderer(this.$refs.renderCanvas, this.scene, this.camera);
            resizeRenderer(this.renderer, this.$refs.renderWrapper, this.camera);
            window.addEventListener('resize', () => {
                resizeRenderer(this.renderer, this.$refs.renderWrapper, this.camera);
            })
        });
    },

    methods: {
        rayCastOnPoint: function (point) {
            let rayCaster = new THREE.Raycaster();
            rayCaster.setFromCamera(point, this.camera);
            let intersects = rayCaster.intersectObjects(this.scene.children, true);

            let intersect = intersects[0];
            if (intersect) {
                intersect.face.color.setRGB(1, 0, 0);
                let p = intersect.object.worldToLocal(intersect.point);

                let geometry = new THREE.SphereGeometry(0.05, 5, 5);
                let material = new THREE.MeshBasicMaterial({color: 0xff0000});
                let sphere = new THREE.Mesh(geometry, material);
                sphere.position.set(p.x, p.y, p.z);

                let mesh = this.skullGroup;
                mesh.add(sphere);
                this.points.push({
                    vector: p,
                    mesh: sphere
                });

                return p;
            }
            else return false;
        },
        onClick: function (event) {
            let canvas = this.$refs.renderCanvas;

            this.mouse.x = ( event.offsetX / canvas.scrollWidth ) * 2 - 1;
            this.mouse.y = -( event.offsetY / canvas.scrollHeight ) * 2 + 1;

            this.rayCastOnPoint(this.mouse);
        },
        rayCastMatrix: function () {
            let pointMatrix = [];

            for (let x = -0.8; x <= 0.8; x += 0.1) {
                pointMatrix[x] = [];
                for (let y = -0.8; y <= 0.8; y += 0.1) {
                    pointMatrix[x][y] = this.rayCastOnPoint({x, y});

                }
            }
        },
        rotateMesh: function (dir) {
            const delta = 0.2;
            let mesh = this.skullGroup;
            if (dir === 'up') mesh.rotation.x -= delta;
            if (dir === 'down') mesh.rotation.x += delta;
            if (dir === 'right') mesh.rotation.y += delta;
            if (dir === 'left') mesh.rotation.y -= delta;
            if (dir === 'reset') {
                mesh.rotation.x = 0;
                mesh.rotation.y = 0;
            }
        },
        createMeshOnPoints: function () {

            let vertices = this.points.map(point => lengthenVector(point.vector, 0.2));
            let holes = [];
            let triangles;
            let geometry = new THREE.Geometry();
            let material = new THREE.MeshLambertMaterial({color: 0xffccff, side: THREE.DoubleSide});

            geometry.vertices = vertices;

            triangles = Triangulate(vertices.map(v => [v.x, v.y, v.z]));

            for (let i = 0; i < triangles.length; i++) {
                geometry.faces.push(new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2]));
                geometry.faces.push(new THREE.Face3(triangles[i][0], triangles[i][2], triangles[i][3]));
            }
            geometry.computeFaceNormals();

            let mesh = new THREE.Mesh(geometry, material);
            this.skullGroup.add(mesh);

            this.points.forEach(point => this.skullGroup.remove(point.mesh));
            this.points = [];
        }
    },

    template: Template,
}
