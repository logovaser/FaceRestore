/**
 * Created by logov on 25-Apr-17.
 */

export default new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
        resolve(result);
    });

    if (permissionResult) {
        permissionResult.then(resolve, reject);
    }
})
    .then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
        }
    })
