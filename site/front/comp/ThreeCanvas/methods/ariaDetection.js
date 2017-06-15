/**
 * Created by logov on 24-May-17.
 */

import HaarFeatures from '../Haar_features.json_p'
console.log('HaarFeatures', HaarFeatures);

Math.average = function () {
    let sum = 0,
        args = Array.prototype.slice.call(arguments);
    args.forEach(arg => sum += arg);
    return sum / args.length;
};

function convertToMono(img) {
    let monoData = [];
    for (let i = img.data.length - 1; i >= 0; i -= 4) {
        monoData.push(Math.floor(Math.average(img.data[i - 1], img.data[i - 2], img.data[i - 3]) / 10));
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

function getFeatureValue(feature, x, y) {
    let wSum = 0, hSum = 0;
    for (let [row_i, row] of feature.grid.hProps.entries()) {
        hSum += row;
        if (hSum >= y) {
            for (let [col_i, col] of feature.grid.wProps.entries()) {
                wSum += col;
                if (wSum >= x) return feature.grid.colors[row_i * feature.grid.wProps.length + col_i];
            }
            break;
        }
    }
}

function compareFeatureWithScreen(screen, feature) {
    let darkPixelsSum = 0, lightPixelsSum = 0;
    for (let y = 0; y < frame.height; y++) {
        for (let x = 0; x < frame.width; x++) {
            let dotColor = getFeatureValue(feature, x / frame.width, y / frame.height);
            let pixelValue = getPixel(screen, Math.floor(frame.x + x), Math.floor(frame.y + y));
            if (dotColor === 1) lightPixelsSum += pixelValue;
            else darkPixelsSum += pixelValue;
        }
    }
    return lightPixelsSum - darkPixelsSum;
}

function findAllMatches() {
    const conf = {
        size: {
            min: 0.7,
            max: 1.3,
            step: .1,
        },
        pos: {
            offset: 0.05,
            step: 0.01,
        },
    };

    function* compareGenerator() {
        for (let feature of HaarFeatures) {
            let max = 0,
            maxFrame = {};
            for (let size = conf.size.min; size <= conf.size.max; size += conf.size.step) {
                for (let posX = -conf.pos.offset; posX <= conf.pos.offset; posX += conf.pos.step) {
                    for (let posY = -conf.pos.offset; posY <= conf.pos.offset; posY += conf.pos.step) {
                        frame.width = feature.w * screen.width * size;
                        frame.height = feature.h * screen.height * size;
                        frame.x = feature.x * screen.width - (size - 1) * frame.width / 2 + posX * screen.width;
                        frame.y = feature.y * screen.height - (size - 1) * frame.height / 2 + posY * screen.height;
                        let result = compareFeatureWithScreen(screen, feature) || 0;
                        if (result > max) {
                            max = result;
                            maxFrame = {
                                x: frame.x,
                                y: frame.y,
                                width: frame.width,
                                height: frame.height
                            };
                        }
                        yield;
                    }
                }
            }
            console.log(`feature ${feature.type} similiarity: ${max}`);
            self.onClick({offsetX: maxFrame.x + maxFrame.width / 2, offsetY: maxFrame.y + maxFrame.height / 2});
        }
    }

    let generator = compareGenerator();


    (function rayCast() {
        let iteration = generator.next();
        if (!iteration.done) {
            // setTimeout(() => {
            requestAnimationFrame(rayCast);
            // }, 3000);
        }
    })()
}

function init() {
    screen = convertToMono(screenShotRenderer());
}

let self,
    screen,
    frame,
    renderer;

export function detectFaceParts() {
    self = this;
    renderer = this.renderer;
    frame = this.mask;
    init();

    findAllMatches();
}
