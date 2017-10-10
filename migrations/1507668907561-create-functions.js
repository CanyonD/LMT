'use strict'

const db = require('../server/db');

exports.up = function(next) {
    let f = [
        {
            "_id" : 10,
            "value" : "Fileshare scan",
            "name" : "Discovery Fileshare scan",
            "description" : "Discovery Fileshare scan",
            "default" : 5
        },
        {
            "_id" : 1,
            "name" : "Discovery Local scan",
            "description" : "Discovery Local scan",
            "default" : 12,
            "value" : "Local/Fileshare scan"
        },
        {
            "_id" : 2,
            "name" : "Discovery Outlook scan",
            "description" : "Discovery Outlook scan",
            "default" : 2,
            "value" : "Outlook scan"
        },
        {
            "_id" : 3,
            "value" : "Network scan",
            "description" : "Discovery Network scan",
            "name" : "Discovery Network scan",
            "default" : 5
        },
        {
            "_id" : 4,
            "value" : "Exchange scan",
            "description" : "Discovery Exchange scan",
            "default" : 5,
            "name" : "Discovery Exchange scan"
        },
        {
            "_id" : 5,
            "value" : "Database scan",
            "default" : 5,
            "name" : "Discovery Database scan",
            "description" : "Discovery Database scan"
        },
        {
            "_id" : 6,
            "value" : "SharePoint scan",
            "name" : "Discovery SharePoint scan",
            "description" : "Discovery SharePoint scan",
            "default" : 3
        },
        {
            "_id" : 7,
            "value" : "Application Control",
            "description" : "Application Control",
            "default" : 5,
            "name" : "Application Control"
        },
        {
            "_id" : 8,
            "name" : "Inspector",
            "description" : "Inspector",
            "value" : "Inspector",
            "default" : 10
        },
        {
            "_id": 9,
            "value": "OCR",
            "default": 5,
            "description": "OCR Intergration",
            "name": "OCR Intergration"
        }
    ];
    f.forEach((value) => {
        db.get().collection('functions').insert(
            value,
            (err) => {
                if (err.code !== 11000) {
                    throw err;
                }
            }
        );
    });
    next();
};

exports.down = function(next) {
  next();
};
