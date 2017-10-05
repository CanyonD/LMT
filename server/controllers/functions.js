"use strict";

const Functions = require('../models/functions');
// var log = require('../logger')(module);
// var logController = require('../controllers/log');

exports.all = (req, res) => {
    // logController.route(req, res);
    Functions.all(
        (err, docs) => {
            if (err) {
                // log.error(err);
                return res.sendStatus(500);
            }
            res.send(docs);
        }
    );
};

exports.findById = (req, res) => {
    Functions.findById(
        parseInt(req.params.id),
        (err, doc) => {
            if (err) {
                return res.sendStatus(500);
            }
            res.send(doc);
        }
    );
};

exports.getNameById = (req, res) => {
    // logController.route(req, res);
    Functions.findById(
        req.params.id,
        (err, doc) => {
            if (err) {
                // log.error(err);
                return res.sendStatus(500);
            }
            res.send(doc.name);
        }
    );
};

exports.create = (req, res) => {
    // logController.route(req, res);
    let functions = {
        _id: req.body._id,
        name: req.body.name,
        description: req.body.description,
        value: req.body.value,
        default: req.body.default
    };
    Functions.create(functions, (err, result) => {
        if (err) {
            // log.error(err);
            return res.sendStatus(500);
        }
        res.send(functions);
    });
};

exports.update = (req, res) => {
    let values = {
        name: req.body.name,
        description: req.body.description,
        value: req.body.value,
        default: req.body.default
    };
    Functions.update(
        parseInt(req.params.id),
        values,
        (err, result) => {
            if (err) {
                // log.error(err);
                return res.sendStatus(500);
            }
            // console.log(result);
            res.sendStatus(200);
        }
    );
};

exports.delete = (req, res) => {
    // logController.route(req, res);
    Functions.delete(
        req.params.id,
        (err, result) => {
            if (err) {
                // log.error(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
};
