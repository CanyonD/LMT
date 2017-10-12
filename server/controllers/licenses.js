"use strict";

const ObjectID = require('mongodb').ObjectID;
const Licenses = require('../models/licenses');
const Customers = require('../models/customers');
const queryToMongo = require('query-to-mongo');
const async = require('async');

exports.find = (req, res) => {
    let query = queryToMongo(req.query);
    // console.log('req.query: ',req.query);
    if (typeof query.criteria._id !== 'undefined' && query.criteria._id !== null && query.criteria._id !== '') {
        query.criteria._id = ObjectID(query.criteria._id);
    }

    Licenses.find(
        query.criteria,
        query.options,
        (err, docs) => {
            if (err) {
                return res.sendStatus(500);
            }
            docs.forEach((value) => {
                // console.log(value);
            });
            res.send({
                rows: docs,
                total: docs.length
            });
        }
    );
};

exports.findById = (req, res) => {
    Licenses.findById(
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
    Licenses.findById(
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
    let license = {
        customer_id: req.body.customer_id,
        customer_name: req.body.customer_name,
        valid_from: req.body.valid_from,
        valid_until: req.body.valid_until,
        functions: req.body.functions,
        addedAt: Date.now(),
        status: 0
    };
    Licenses.create(license, (err, result) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.send(license);
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
            customer_id: req.body.customer_id,
            customer_name: req.body.customer_name,
            valid_from: req.body.valid_from,
            valid_until: req.body.valid_until,
            functions: req.body.functions
        };
    }
    Licenses.update(
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
