/**
 * Created by logov on 19-May-17.
 */

import Triangulate from 'delaunay-triangulate';

import {rayCastOnPointSilent, rayCastOnPoint, rayCastMatrix, rotateRayCast, clearPoints} from './methods/rayCast'
import {getSlices} from './methods/slices'
import {createMeshOnPoints, createEye} from './methods/meshCreation'
import {onClick, rotateMesh, createEyeClick, view, editMesh, deleteMesh, getBmpFromCanvas, skinWizardClick} from './methods/controls'
import {detectFaceParts} from './methods/ariaDetection'

export default {

    rayCastOnPointSilent, rayCastOnPoint, rayCastMatrix, rotateRayCast, clearPoints,
    getSlices,
    createMeshOnPoints, createEye,
    onClick, rotateMesh, createEyeClick, view, editMesh, deleteMesh, getBmpFromCanvas, skinWizardClick,
    detectFaceParts,

}
