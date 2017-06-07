/**
 * Created by logov on 25-Apr-17.
 */

const applicationServerPublicKey = 'BCTOM99nRCNbsknSzY0vJyNpA57PWZ-HvTKJqQ8S5Y2ycFHRUSi2v239dBF7gZrfk_C2kj7NE0Abwx_IwIfSyoo';
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default function (swRegistration) {
    return navigator.serviceWorker.ready.then(function (swRegistration) {
        swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(function (subscription) {
                console.log('subscription:', JSON.stringify(subscription));
            })
            .catch(function (error) {
                if (Notification.permission === 'denied') {
                    console.log('Permission for Notifications was denied');
                } else {
                    console.log('Unable to subscribe to push.', error);
                }
            });
    });

    return swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerPublicKey
    })
        .then(function (subscription) {
            console.log('User is subscribed.');
            console.log('subscription:', subscription);
        })
        .catch(function (err) {
            console.error('Failed to subscribe the user: ', err);
        });
}


// export default new Promise(function (resolve, reject) {
//     const permissionResult = Notification.requestPermission(function (result) {
//         resolve(result);
//     });
//
//     if (permissionResult) {
//         permissionResult.then(resolve, reject);
//     }
// })
//     .then(function (permissionResult) {
//         if (permissionResult !== 'granted') {
//             throw new Error('We weren\'t granted permission.');
//         }
//     })
