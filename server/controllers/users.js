"use strict";

const Users = require('../models/users');

exports.findById = (req, res) => {
    Users.findById(
        req.params.id,
        (err, doc) => {
            if (err) {
                return res.sendStatus(500);
            }
            delete doc['password'];
            delete doc['addedAt'];
            res.send(doc);
        }
    );
};

exports.update = (req, res) => {
    let values = {
        name: req.body.name,
        description: req.body.description
    };
    Users.update(
        req.params.id,
        values,
        (err, result) => {
            if (err) {
                return res.sendStatus(500);
            }
            console.log(result);
            res.sendStatus(200);
        }
    );
};