/**
 * Created by logov on 22-May-17.
 */

import '../../../lib/jimp.min'

const skinWizard = {
    steps: [
        {text: 'forehead', bone: 'forehead'},
        {text: 'crown', bone: 'crown'},
        // {text: 'nape', bone: 'nape'},
        // {text: 'right head side', bone: 'side_r'},
        // {text: 'left head side', bone: 'side_l'},
        {text: 'right jaw end', bone: 'jaw_end_r'},
        {text: 'left jaw end', bone: 'jaw_end_l'},
        {text: 'right jaw center', bone: 'jaw_center_r'},
        {text: 'left jaw center', bone: 'jaw_center_l'},
        {text: 'chin', bone: 'chin'},
        {text: 'right brow', bone: 'brow_r'},
        {text: 'left brow', bone: 'brow_l'},
        {text: 'nose bridge', bone: 'bridge'},
        {text: 'nose bone end', bone: 'nose'},
        {text: 'right chick', bone: 'chick_r'},
        {text: 'left chick', bone: 'chick_l'},
    ],
    currentStep: 0
};

function getActualObjectFromMesh(mesh) {
    if (mesh.parent.name = 'eyeSample') return mesh.parent;
    else return mesh;
}

export function onClick(event) {
    let canvas = this.$refs.renderCanvas;

    this.mouse.x = ( event.offsetX / canvas.scrollWidth ) * 2 - 1;
    this.mouse.y = -( event.offsetY / canvas.scrollHeight ) * 2 + 1;

    if (this.mode.alias === 'skinWizard') {
        skinWizard.steps[skinWizard.currentStep].point = this.rayCastOnPointSilent(this.mouse, {returnIntersect: true}).point;

        if (++skinWizard.currentStep < skinWizard.steps.length) {
            this.mode = {
                name: `Click on ${skinWizard.steps[skinWizard.currentStep].text}`,
                alias: 'skinWizard',
                className: 'indicator-point-select'
            };
        }
        else {
            let headInstance = this.skinnedHead;
            headInstance.skeleton.bones.forEach(bone => {
                let step = skinWizard.steps.find(step => step.bone === bone.name);

                if (step) {
                    let lPoint = headInstance.worldToLocal(step.point);
                    bone.position.set(lPoint.x, lPoint.y, lPoint.z);
                }
            });
            this.skullGroup.add(headInstance);
            this.mode = {name: 'view', className: 'indicator-view'};
        }
    }
    else if (this.mode.name === 'view') {
        this.rayCastOnPoint(this.mouse);
    }
    else if (this.mode.name === 'Eye point select') {
        this.createEye(this.rayCastOnPointSilent(this.mouse));
    }
    else if (this.mode.name === 'Edit mesh') {
        let mesh = this.rayCastOnPointSilent(this.mouse, {returnObject: true});
        this.toolboxPosition = getActualObjectFromMesh(mesh).position;
    }
    else if (this.mode.name === 'Delete mesh') {
        let mesh = this.rayCastOnPointSilent(this.mouse, {returnObject: true});
        this.skullGroup.remove(getActualObjectFromMesh(mesh));
    }
}

export function rotateMesh(dir, delta = 0.2) {
    let mesh = this.skullGroup;
    if (dir === 'up') mesh.rotation.x += delta;
    if (dir === 'down') mesh.rotation.x -= delta;
    if (dir === 'right') mesh.rotation.y -= delta;
    if (dir === 'left') mesh.rotation.y += delta;
    if (dir === 'reset') {
        mesh.rotation.x = 0;
        mesh.rotation.y = 0;
    }
}

export function createEyeClick() {
    this.mode = {name: 'Eye point select', className: 'indicator-point-select'};
}

export function getBmpFromCanvas() {
    let gl = this.renderer.context;
    let pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    console.dir(pixels);
}

export function view() {
    this.mode = {name: 'view', className: 'indicator-view'};
}

export function editMesh() {
    this.mode = {name: 'Edit mesh', className: 'indicator-point-select'};
}

export function deleteMesh() {
    this.mode = {name: 'Delete mesh', className: 'indicator-point-select'};
}

export function skinWizardClick() {

    this.mode = {
        name: `Click on ${skinWizard.steps[0].text}`,
        alias: 'skinWizard',
        className: 'indicator-point-select'
    };
    skinWizard.points = [];
    skinWizard.currentStep = 0;

}
