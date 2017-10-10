"use strict";

const app = require('express')();
const nunjucks = require('nunjucks');
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const migrate = require('migrate');
const migrations = migrate.load(__dirname + '/../migrations/.migrate', __dirname + '/../migrations');
const port = 8080;
const ip = 'localhost';

const appVersion = require('../package.json').version;
const db = require('./db');

const passport = require('passport');
const { Strategy } = require('passport-jwt');

const { jwt } = require('./config');

passport.use(new Strategy(jwt, function(jwt_payload, done) {
    if(jwt_payload != void(0)) return done(false, jwt_payload);
    done();
}));

mongoose.connect('mongodb://' + ip + ':27017/lmt', {useMongoClient: true});
mongoose.Promise = require('bluebird');
mongoose.set('debug', true);

nunjucks.configure('./client/views', {
    autoescape: true,
    express: app
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cookieParser());

require('./router')(app);

require('./sockets')(io);

db.connect('mongodb://' + ip + ':27017/lmt', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    migrations.up((err) => {
        if (err)  {
            console.log(err);
            return;
        }
        console.log('Migration completed');

        server.listen(port, () => {
            console.log('Server started on port ' + port + '...');
            console.log('Version ' + appVersion);
        });
    });
});
