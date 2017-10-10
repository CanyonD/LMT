"use strict";

const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.all = (cb) => {
    db.get().collection('functions')
        .find()
        .sort({'name':1})
        .toArray(
        (err, docs) => {
            cb(err, docs);
        }
    );
};

exports.findById = (id, cb) => {
    db.get().collection('functions').findOne(
        {_id: id},
        (err, doc) => {
            cb(err, doc);
        }
    );
};

exports.create = (functions, cb) => {
    db.get().collection('functions').insert(
        functions,
        (err, result) => {
            cb(err, result);
        }
    );
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
