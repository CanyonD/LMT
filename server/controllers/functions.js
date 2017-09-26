"use strict";

const Functions = require('../models/functions');
// var log = require('../logger')(module);
// var logController = require('../controllers/log');

exports.all = (req, res) => {
    // logController.route(req, res);
    Functions.all(function(err, docs) {
        if (err) {
            // log.error(err);
            return res.sendStatus(500);
        }
        res.send(docs);
    });
};

exports.findById = (req, res) => {
    // logController.route(req, res);
    console.log('findById: ', req.params.id)
    Functions.findById(parseInt(req.params.id), function(err, doc) {
        if (err) {
            // log.error(err);
            return res.sendStatus(500);
        }
        res.send(doc);
    });
};

exports.getNameById = (req, res) => {
    // logController.route(req, res);
    Functions.findById(req.params.id, function(err, doc) {
        if (err) {
            // log.error(err);
            return res.sendStatus(500);
        }
        res.send(doc.name);
    });
};

exports.create = (req, res) => {
    // logController.route(req, res);
    var functions = {
        _id: req.body.id,
        name: req.body.name,
        description: req.body.desc
    };
    Functions.create(functions, function(err, result) {
        if (err) {
            // log.error(err);
            return res.sendStatus(500);
        }
        res.send(functions);
    });
};

exports.update = (req, res) => {
    // logController.route(req, res);
    Functions.update(
        req.params.id,
        {name: req.body.name},
        function(err, result) {
            if (err) {
                // log.error(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
};

exports.delete = (req, res) => {
    // logController.route(req, res);
    Functions.delete(
        req.params.id,
        function(err, result) {
            if (err) {
                // log.error(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
};
