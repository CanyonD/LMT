"use strict";

const Customers = require('../models/customers');
// var log = require('../logger')(module);
// var logController = require('../controllers/log');

exports.all = (req, res) => {
    let query = req.query,
        sort,
        filter;
    // console.log( query );
    if (query.sort !== null && query.sort !== '' && typeof query.sort === 'undefined') {
        sort = {'name': 1};
    } else {
        sort = {};
    }

    if (query.filter !== null && query.filter !== '' && typeof query.filter === 'undefined') {
        filter = {'status': 0};
    } else {
        filter = {'status': 1};
    }

    if (
        query.search !== null && query.search !== '' && typeof query.search === 'undefined'
    ) {
        Customers.all(
            sort,
            filter,
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
        Customers.findByName(
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
