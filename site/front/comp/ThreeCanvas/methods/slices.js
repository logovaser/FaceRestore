/**
 * Created by logov on 22-May-17.
 */

export function getSlices() {
    let self = this;
    let slices = [];

    function* rayCastGen() {
        for (let x = -.5; x <= .5; x += .1) {
            let column = [];
            for (let y = -.7; y <= .7; y += .02) {
                let point = self.rayCastOnPoint({x, y});
                if (point) column.push(point);
                yield point;
            }
            slices.push(column);
        }
    }

    let generator = rayCastGen();

    let doRayCasting = new Promise(resolve => {
        (function rayCast() {
            let iteration = generator.next();
            console.log(iteration);
            if (iteration.done) resolve();
            else requestAnimationFrame(rayCast);
        })()
    });

    doRayCasting.then(() => {
        this.slices = slices.map(slice => {
            let path = '';
            slice.forEach(point => path += `${point.z + 5},${-point.y + 5} `);
            return {points: slice, path}
        })
    });

}
