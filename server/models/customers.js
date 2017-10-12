"use strict";

const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.find = (criteria, options, cb) => {
    db.get().collection('customers')
        .find(criteria, options)
        .toArray(
            (err, docs) => {
                cb(err, docs);
            }
        );
};

exports.findByName = (id, cb) => {
    db.get().collection('customers')
        .find({
            'name': {$regex: id, $options: 'i'}
        })
        .toArray(
            (err, doc) => {
                // console.log(doc);
                cb(err, doc);
            }
        )
    ;
};

exports.findById = (id, cb) => {
    db.get().collection('customers').findOne(
        {_id: ObjectID(id)},
        (err, doc) => {
            cb(err, doc);
        }
    );
};

exports.create = (functions, cb) => {
    db.get().collection('customers').insert(
        functions,
        (err, result) => {
            cb(err, result);
        }
    );
};

exports.update = (id, newData, cb) => {
    db.get().collection('customers').updateOne(
        {_id: ObjectID(id) },
        { $set: newData },
        (err, result) => {
            cb(err, result);
        }
    );
};

exports.delete = (id, cb) => {
    db.get().collection('customers').deleteOne(
        {_id: ObjectID(id)},
        (err, result) => {
            cb(err, result);
        }
    );
};