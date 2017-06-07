/**
 * Created by logov on 22-May-17.
 */

export function createMeshOnPoints() {
    let vertices = this.points.map(point => point.vector),
        triangles,
        geometry = new THREE.Geometry(),
        material = new THREE.MeshLambertMaterial({color: 0xffccff, side: THREE.DoubleSide});

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

export function createEye(p) {
    let eyeInstance = this.eyeSample.clone();
    eyeInstance.position.set(p.x, p.y, p.z + 0.5);
    this.skullGroup.add(eyeInstance);
    this.toolboxPosition = eyeInstance.position;
    this.addedObjects.push(eyeInstance);
}
