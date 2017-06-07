/**
 * Created by logov on 22-May-17.
 */

function lengthenVector(vector, length) {
    return vector.multiplyScalar(length / vector.length() + 1);
}

export function clearPoints() {
    this.points.forEach(point => self.skullGroup.remove(point.mesh));
    this.points = [];
}

export function rayCastOnPointSilent(point, options = {}) {
    let rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(point, this.camera);
    let intersects = rayCaster.intersectObjects(this.scene.children, true);

    let intersect = intersects[0];
    if (intersect) {
        if (options.returnObject) return intersect.object;
        else {
            if (options.returnIntersect) return intersect;
            else return intersect.object.worldToLocal(intersect.point);
        }
    }
    else return false;
}

export function rayCastOnPoint(point) {
    let p = this.rayCastOnPointSilent(point);

    if (p) {
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
}

export function rayCastMatrix() {
    let pointMatrix = [];

    for (let x = -0.8; x <= 0.8; x += 0.1) {
        pointMatrix[x] = [];
        for (let y = -0.8; y <= 0.8; y += 0.1) {
            pointMatrix[x][y] = this.rayCastOnPoint({x, y});

        }
    }
}

export function rotateRayCast() {
    let self = this;
    let rotation = 0,
        i = 0,
        maxAngle = Math.PI * 2,
        step = maxAngle / 80;
    let points = [];

    function triangulate(vertices) {
        let triangles = [];
        vertices.forEach((row, i) => {
            if (row) row.forEach((vertex, j) => {
                if (!vertices[i][j]) return;
                if (!vertices[i + 1]) return;
                if (vertices[i][j - 1] && vertices[i + 1][j - 1]) triangles.push([i * row.length + j, i * row.length + j - 1, (i + 1) * row.length + j - 1]);
                if (vertices[i + 1][j - 1] && vertices[i + 1][j]) triangles.push([i * row.length + j, (i + 1) * row.length + j - 1, (i + 1) * row.length + j]);
            })
        });
        return triangles;
    }

    function createMesh(vertices) {

        vertices.forEach(row => {
            if (row) row.forEach((point, j) => {
                if (point) lengthenVector(point, 0.2)
            })
        });
        let triangles;
        let geometry = new THREE.Geometry();
        let material = new THREE.MeshLambertMaterial({color: 0xffccff, side: THREE.DoubleSide});

        triangles = triangulate(vertices);

        geometry.vertices = [].concat.apply([], vertices);

        for (let i = 0; i < triangles.length; i++) {
            geometry.faces.push(new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2]));
        }
        geometry.computeFaceNormals();

        let mesh = new THREE.Mesh(geometry, material);
        self.skullGroup.add(mesh);

        clearPoints();
    }

    function iter() {
        points.push([]);
        for (let y = -20; y <= 20; y++) {
            points[i][y + 20] = self.rayCastOnPoint({x: 0, y: y / 20});
        }
        self.rotateMesh('left', step);
        i++;
        if ((rotation += step) < maxAngle) requestAnimationFrame(iter);
        else createMesh(points);
    }

    iter();
}
