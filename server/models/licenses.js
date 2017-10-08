"use strict";

const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.all = (cb) => {
    db.get().collection('licenses').find().toArray(
        (err, docs) => {
            cb(err, docs);
        }
    );
};

exports.findById = (id, cb) => {
    db.get().collection('licenses').findOne(
        {_id: ObjectID(id)},
        (err, doc) => {
            cb(err, doc);
        }
    );
};

exports.create = (functions, cb) => {
    db.get().collection('licenses').insert(
        functions,
        (err, result) => {
            cb(err, result);
        }
    );
};

exports.update = (id, newData, cb) => {
    db.get().collection('licenses').updateOne(
        {_id: ObjectID(id) },
        { $set: newData },
        (err, result) => {
            cb(err, result);
        }
    );
};
