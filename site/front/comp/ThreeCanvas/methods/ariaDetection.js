/**
 * Created by logov on 24-May-17.
 */

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

function getPixel(img, x, y) {
    return img.data[img.width * y + x]
}

function initImages(renderer) {
    let gl = renderer.context;
    let pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    screen = convertToMono({
        data: pixels,
        width: gl.drawingBufferWidth,
        height: gl.drawingBufferHeight
    });

    function readImage(name) {
        return Jimp.read(`/res/${name}.bmp`).then(img => {
            img = img.greyscale();
            masks[name] = convertToMono({
                data: img.bitmap.data,
                width: img.bitmap.width,
                height: img.bitmap.height
            });
        })
    }

    return Promise.all([
        readImage('chin'),
        readImage('eye'),
        readImage('nose'),
    ]);
}

function averagePoint(img, targetX, targetY, sizeMultiplier) {
    let sum = 0;
    for (let y = targetY; y < targetY + sizeMultiplier; y++) {
        for (let x = targetX; x < targetX + sizeMultiplier; x++) {
            sum += getPixel(img, x, y)
        }
    }
    return sum / Math.pow(sizeMultiplier, 2);
}

function compareMaskWithScreen(img, mask, targetX, targetY) {
    let sum = 0,
        count = 0;
    for (let y = 0; y < mask.height; y++) {
        for (let x = 0; x < mask.width; x++) {
            let imgPoint = averagePoint(img, targetX, targetY, mask.sizeMultiplier);
            let maskPoint = getPixel(mask, x, y);
            count++;
            sum += 65025 - Math.pow(Math.abs(imgPoint - maskPoint), 2);
        }
    }
    return sum / count * 100 / 65025;
}

function findAllMatches(self, screen, masks) {
    function* compareGenerator() {
        for (let key in masks) {
            if (masks.hasOwnProperty(key)) {
                let mask = masks[key];
                for (let sizeMultiplier = 6; sizeMultiplier < 12; sizeMultiplier++) {
                    let sizedMask = {
                        name: key,
                        data: mask.data,
                        width: mask.width,
                        height: mask.height,
                        sizeMultiplier
                    };
                    self.mask.width = mask.width * sizeMultiplier;
                    self.mask.height = mask.height * sizeMultiplier;

                    for (let y = 0; y < screen.height - sizedMask.height * sizeMultiplier; y += 20) {
                        for (let x = 0; x < screen.width - sizedMask.width * sizeMultiplier; x += 20) {
                            let similarity = compareMaskWithScreen(screen, sizedMask, x, y);
                            self.mask.x = x;
                            self.mask.y = y;
                            if (similarity > 60) console.log(`mask ${sizedMask.name} similiarity ${similarity}%`);
                            yield;
                        }
                    }
                }
            }
        }
    }

    let generator = compareGenerator();


    (function rayCast() {
        let iteration = generator.next();
        if (!iteration.done) requestAnimationFrame(rayCast);
    })()
}

let screen = {};
let masks = {};

export function detectFaceParts() {
    initImages(this.renderer).then(() => {
        findAllMatches(this, screen, masks);
    })
}
