const MongoClient = require('mongodb').MongoClient;

const state = {
    db: null
};

exports.connect = (url, done) => {
    console.log('Connect to DB...');
    console.log('URL to DB: ', url);
    if (state.db) {
        return done();
    }

    MongoClient.connect(url, (err, db) => {
        if (err) {
            return done(err);
        }

        state.db = db;
        done();
    });
};

exports.get = () => state.db;
