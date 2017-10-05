"use strict";

const Customers = require('../models/customers');
// var log = require('../logger')(module);
// var logController = require('../controllers/log');

exports.all = (req, res) => {
    Customers.all(
        (err, docs) => {
            if (err) {
                return res.sendStatus(500);
            }
            res.send(docs);
        }
    );
};

exports.findById = (req, res) => {
    Customers.findById(
        req.params.id,
        (err, doc) => {
            if (err) {
                return res.sendStatus(500);
            }
            res.send(doc);
        }
    );
};

exports.getNameById = (req, res) => {
    Customers.findById(
        req.params.id,
        (err, doc) => {
            if (err) {
                return res.sendStatus(500);
            }
            res.send(doc.name);
        }
    );
};

exports.create = (req, res) => {
    let customer = {
        name: req.body.name,
        description: req.body.description,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        customer_code: req.body.customer_code
    };
    Customers.create(customer, (err, result) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.send(customer);
    });
};

exports.update = (req, res) => {
    let values = {
        name: req.body.name,
        description: req.body.description,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        customer_code: req.body.customer_code
    };
    Customers.update(
        req.params.id,
        values,
        (err, result) => {
            if (err) {
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
};