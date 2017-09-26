"use strict";

const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.all = function(cb) {
    db.get().collection('functions').find().toArray(function(err, docs) {
        cb(err, docs);
    });
};

exports.findById = function(id, cb) {
    db.get().collection('functions').findOne({_id: id}, function(err, doc) {
        cb(err, doc);
    });
};

exports.create = function(functions, cb) {
    db.get().collection('functions').insert(functions, function(err, result) {
        cb(err, result);
    });
};

exports.update = function(id, newData, cb) {
    db.get().collection('functions').updateOne(
        {_id: ObjectID(id)},
        { $set: newData },
        function(err, result) {
            cb(err, result);
        }
    );
};

exports.delete = function(id, cb) {
    db.get().collection('functions').deleteOne(
        {_id: ObjectID(id)},
        function(err, result) {
            cb(err, result);
        }
    );
};
