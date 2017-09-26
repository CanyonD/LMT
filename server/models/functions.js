"use strict";

const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.all = (cb) => {
    db.get().collection('functions').find().toArray(function(err, docs) {
        cb(err, docs);
    });
};

exports.findById = (id, cb) => {
    db.get().collection('functions').findOne({_id: id}, function(err, doc) {
        cb(err, doc);
    });
};

exports.create = (functions, cb) => {
    db.get().collection('functions').insert(functions, function(err, result) {
        cb(err, result);
    });
};

exports.update = (id, newData, cb) => {
    db.get().collection('functions').updateOne(
        {_id: id },
        { $set: newData },
        (err, result) => {
            cb(err, result);
        }
    );
};

exports.delete = (id, cb) => {
    db.get().collection('functions').deleteOne(
        {_id: ObjectID(id)},
        (err, result) => {
            cb(err, result);
        }
    );
};
