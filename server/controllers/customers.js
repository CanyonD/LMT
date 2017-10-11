"use strict";

const ObjectID = require('mongodb').ObjectID;
const Customers = require('../models/customers');
const queryToMongo = require('query-to-mongo');

exports.find = (req, res) => {
    let query = queryToMongo(req.query);
    // console.log('req.query: ',req.query);
    if (typeof query.criteria._id !== 'undefined' && query.criteria._id !== null && query.criteria._id !== '') {
        query.criteria._id = ObjectID(query.criteria._id);
    }
    if (typeof query.criteria.search !== 'undefined' && query.criteria.search !== null && query.criteria.search !== '') {
        query.criteria.name = {
                $regex: String(query.criteria.search),
                $options: 'i'
        };
        delete query.criteria.search;
    }
    if (typeof query.criteria.licenses !== 'undefined' || query.criteria.licenses === null || query.criteria.licenses === '') {
        query.criteria.licenses = {
            $size: 0
        };
    }
    if (typeof query.criteria._id !== 'undefined' && query.criteria._id !== null && query.criteria._id !== '') {
        query.criteria._id = ObjectID(query.criteria._id);
    }
    // console.log('criteria>>  ',query.criteria);
    // console.log('options>>  ',query.options);
    Customers.find(
        query.criteria,
        query.options,
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
        customer_code: req.body.customer_code,
        addedAt: Date.now(),
        status: 0
    };
    Customers.create(customer, (err, result) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.send(customer);
    });
};

exports.update = (req, res) => {
    let values = [];
    if (req.body.status !== null && typeof req.body.status !== "undefined") {
        values = {
            status: req.body.status
        };
    } else {
        values = {
            name: req.body.name,
            description: req.body.description,
            phone: req.body.phone,
            address: req.body.address,
            email: req.body.email,
            customer_code: req.body.customer_code
        };
    }
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
