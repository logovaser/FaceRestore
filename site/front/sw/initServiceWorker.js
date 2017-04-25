/**
 * Created by logov on 25-Apr-17.
 */

export default new Promise(resolve => {

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').then(function (registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);

                resolve(registration);

            }).catch(function (err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
})
