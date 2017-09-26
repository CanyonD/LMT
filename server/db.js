const MongoClient = require('mongodb').MongoClient;
// const Logger = require('mongodb').Logger;
// var log = require('./logger.js')(module);

const state = {
    db: null
};

exports.connect = (url, done) => {
    // log.info('Connect to DB...');
    // log.debug('URL to DB: ', url);
    console.log('Connect to DB...');
    console.log('URL to DB: ', url);
    if (state.db) {
        return done();
    }

    MongoClient.connect(url, (err, db) => {
        if (err) {
            return done(err);
        }

        // Logger.setLevel('debug');
        // Logger.setCurrentLogger(function(msg, context) {
        //     console.log(msg, context);
        // });

        state.db = db;
        done();
    });
};

exports.get = () => state.db;
