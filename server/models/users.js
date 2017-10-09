"use strict";

const ObjectID = require('mongodb').ObjectID;
const db = require('../db');

exports.all = (cb) => {
    db.get().collection('UsersCollection').find().toArray(
        (err, docs) => {
            cb(err, docs);
        }
    );
};

exports.findById = (id, cb) => {
    db.get().collection('UsersCollection').findOne(
        {_id: ObjectID(id)},
        (err, doc) => {
            cb(err, doc);
        }
    );
};

exports.findByName = (id, cb) => {
    db.get().collection('UsersCollection')
        .find({
            'username': {$regex: id, $options: 'i'}
        })
        .toArray(
            (err, doc) => {
                // console.log(doc);
                cb(err, doc);
            }
        )
    ;
};

exports.update = (id, newData, cb) => {
    db.get().collection('UsersCollection').updateOne(
        {_id: ObjectID(id) },
        { $set: newData },
        (err, result) => {
            cb(err, result);
        }
    );
};