/**
 * Created by logov on 16-Dec-16.
 */

import Jimp from 'jimp'

var express = require('express'),
    router = express.Router();

router.route('/fonts')
    .get(function (req, res) {

        Jimp.read(dataUrl, function (err, img) {
            if (err) throw err;
            console.dir(img.bitmap.data)
        });

        fonts.find(function (err, items) {
            if (err) return console.error(err);
            res.json(items)
        });
    });

module.exports = router;
