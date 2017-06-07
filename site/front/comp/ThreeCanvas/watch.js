/**
 * Created by logov on 29.05.17.
 */

export default {
    'sideMenuConfig.noseWidth': function (val) {
        this.skinnedHead.skeleton.bones.forEach(bone => {
            if (bone.name === 'nose_wing_r') {
                bone.position.x = -val;
            }
            else if (bone.name === 'nose_wing_l') {
                bone.position.x = val;
            }
        });
    }
}
