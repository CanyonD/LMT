var MongoClient = require('mongodb').MongoClient;
var Logger = require('mongodb').Logger;
// var log = require('./logger.js')(module);

var state = {
    db: null
};

exports.connect = function(url, done) {
    // log.info('Connect to DB...');
    // log.debug('URL to DB: ', url);
    console.log('Connect to DB...');
    console.log('URL to DB: ', url);
    if (state.db) {
        return done();
    }

    MongoClient.connect(url, function(err, db) {
        if (err) {
            return done(err);
        }

        Logger.setLevel('debug');
        Logger.setCurrentLogger(function(msg, context) {
            console.log(msg, context);
        });

        state.db = db;
        done();
    });
};

exports.get = function() {
    return state.db;
};
