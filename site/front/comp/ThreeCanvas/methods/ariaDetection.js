/**
 * Created by logov on 24-May-17.
 */

import HaarFeatures from '../Haar_features.json_p'

function convertToMono(img) {
    let monoData = [];
    for (let i = 0; i < img.data.length; i += 4) {
        monoData.push();
    }
    return {
        data: monoData,
        width: img.width,
        height: img.height
    }
}

function screenShotRenderer() {
    let gl = renderer.context;
    let pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    return {
        data: pixels,
        width: gl.drawingBufferWidth,
        height: gl.drawingBufferHeight
    };
}

function getPixel(img, x, y) {
    return img.data[img.width * y + x]
}

function compareFeatureWithScreen() {

}

function findAllMatches() {
    const config = {
        size: {
            min: 0.7,
            max: 1.3,
            step: .1,
        },
        position: {
            offset: 0.1,
            step: 0.05,
        },
    };

    function* compareGenerator() {
        for (let feature of HaarFeatures) {
            // for (let size = config.size.min; size <= config.size.max; size += config.size.step) {
            //     frame.width = feature.width * size;
            //     frame.height = feature.height * size;


            let similarity = compareFeatureWithScreen(screen, feature);
            frame.x = feature.x;
            frame.y = feature.y;
            console.log(`feature ${sizedFeature.name} similiarity ${similarity}%`);
            yield;


            // for (let y = 0; y < screen.height - sizedFeature.height * size; y += 20) {
            //     for (let x = 0; x < screen.width - sizedFeature.width * size; x += 20) {
            //         let similarity = compareMaskWithScreen(screen, sizedFeature, x, y);
            //         frame.x = x;
            //         frame.y = y;
            //         if (similarity > 60) console.log(`feature ${sizedFeature.name} similiarity ${similarity}%`);
            //         yield;
            //     }
            // }
            // }
        }
    }

    let generator = compareGenerator();


    (function rayCast() {
        let iteration = generator.next();
        if (!iteration.done) requestAnimationFrame(rayCast);
    })()
}

function init() {
    screen = convertToMono(screenShotRenderer());
}

let screen,
    frame,
    renderer;

export function detectFaceParts() {
    renderer = this.renderer;
    frame = this.mask;
    init();

    findAllMatches();
}
