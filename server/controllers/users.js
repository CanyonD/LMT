"use strict";

const Users = require('../models/users');
const bcrypt = require('bcryptjs');

exports.all = (req, res) => {
    let query = req.query;
    // console.log( query );
    if (query.search !== null && query.search !== '' && typeof query.search === 'undefined') {
        // console.log('getting all users');
        Users.all(
            (err, docs) => {
                if (err) {
                    return res.sendStatus(500);
                }
                docs.forEach((value) => {
                    delete value['password'];
                });
                res.send({
                    rows: docs,
                    total: docs.length
                });
            }
        );
    } else {
        // console.log('getting user with query: ' + query.search);
        Users.findByName(
            query.search,
            (err, docs) => {
                if (err) {
                    return res.sendStatus(500);
                }
                docs.forEach((value) => {
                    delete value['password'];
                });
                res.send({
                    rows: docs,
                    total: docs.length
                });
            }
        );
    }
};

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
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        role: req.body.role
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

exports.changePassword= (req, res) => {
    let values = {
        old_password: req.body.old_password,
        new_password: req.body.new_password,
        renew_password: req.body.renew_password
    };

    Users.findById(
        req.params.id,
        (err, doc) => {
            if (err) {
                return res.sendStatus(500);
            }
            if (bcrypt.compareSync(values['old_password'], doc['password']))  {
                console.log('password is correct');
                if (values['new_password'].indexOf(values['renew_password']) === 0) {

                    Users.update(
                        doc['_id'],
                        {
                            password: bcrypt.hashSync(values['new_password'], 12)
                        },
                        (err, result) => {
                            if (err) {
                                return res.sendStatus(500);
                            }
                            // console.log(result);
                            console.log('password was changed');
                            return res.sendStatus(200);
                        }
                    );
                } else {
                    console.log('new passwords are not same');
                    return res.sendStatus(500);
                }
                // res.send(doc);
            } else {
                console.log('password is not correct');
                return res.sendStatus(500);
            }
        }
    );
};
