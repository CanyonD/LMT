'use strict';

const db = require('../server/db');

exports.up = function(next) {
    db.get().collection('customers').remove(
        {},
        (err) => {
            throw err;
        }
    );
    let f = [
        {
            "name" : "example empty",
            "email" : "",
            "phone" : "",
            "address" : "",
            "customer_code" : "",
            "description" : "",
            "addedAt" : 1507747068,
            "status" : 0,
            "licenses" : {
            }
        },
        {
            "name" : "full filling",
            "email" : "Villa@b.net",
            "phone" : "+234678890245",
            "address" : "Mahaicony",
            "customer_code" : "flod_53088",
            "description" : "Best customer from Mahaicony",
            "addedAt" : 1503385987,
            "status" : 0,
            "licenses" : {
                "1": 5,
                "2": 5,
                "3": 5,
                "4": 5,
                "5": 5,
                "6": 5,
                "7": 5,
                "8": 5
            }
        },
        {
            "name" : "person with email",
            "email" : "hidden@fin.com",
            "phone" : "",
            "address" : "",
            "customer_code" : "",
            "description" : "",
            "addedAt" : 1488890283,
            "status" : 0,
            "licenses" : {
                "2": 5,
                "7": 5,
                "8": 5
            }
        },
        {
            "name" : "bad item",
            "email" : "",
            "phone" : "",
            "address" : "",
            "customer_code" : "",
            "description" : "",
            "addedAt" : 1436252827,
            "status" : 1,
            "licenses" : {
            }
        },
        {
            "name" : "with one license",
            "email" : "",
            "phone" : "",
            "address" : "",
            "customer_code" : "nitro_56733",
            "description" : "",
            "addedAt" : 1499630821,
            "status" : 0,
            "licenses" : {
                '6': 1
            }
        }
    ];

    f.forEach((value) => {
        db.get().collection('customers').insert(
            value,
            (err) => {
                throw err;
            }
        );
    });
    next();
};

exports.down = function(next) {

    next();
};
