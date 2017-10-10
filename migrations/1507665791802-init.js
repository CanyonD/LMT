'use strict';

const db = require('../server/db');

exports.up = function(next) {
    // db.get().createCollection("test", function(err, res) {
    //     if (err) throw err;
    // });
    next();
};

exports.down = function(next) {
    // db.get().collection("test").drop(function(err, delOK) {
    //     if (err) throw err;
    // });
    next();
};
