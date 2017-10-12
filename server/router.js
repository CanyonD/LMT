"use strict";

const UsersModel = require('./models/users.model');
const _ = require('lodash');
const config = require('./config');
const bcrypt = require('bcryptjs');
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const packageJSON = require('../package.json');

const functionsController = require('./controllers/functions');
const customersController = require('./controllers/customers');
const licensesController = require('./controllers/licenses');
const usersController = require('./controllers/users');

function checkAuth (req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, decryptToken, jwtError) => {
        if(jwtError != void(0) || err != void(0)) return res.render('index.html', { error: err || jwtError});
        req.user = decryptToken;
        next();
    })(req, res, next);
}

function createToken (body) {
    return jwt.sign(
        body,
        config.jwt.secretOrKey,
        {expiresIn: config.expiresIn}
    );
}

function createAccessToken (body) {
    return jwt.sign(
        body,
        config.jwt.secretOrKey,
        {expiresIn: config.expiresIn}
    );
}

module.exports = app => {
    app.use('/assets', express.static('./client/public'));

    app.use('/public/js', express.static('./node_modules/bootstrap/dist/js')); // redirect bootstrap JS
    app.use('/public/js', express.static('./node_modules/jquery/dist')); // redirect JS jQuery
    app.use('/public/js', express.static('./node_modules/ajax/lib')); // redirect AJAX
    app.use('/public/js', express.static('./node_modules/flatpickr/dist')); // redirect flatpickr
    app.use('/public/js', express.static('./node_modules/jquery.cookie')); // redirect for jquery.cookie.js
    app.use('/public/js', express.static('./node_modules/bootstrap-table/dist')); // redirect for bootstrap-table

    app.use('/public/css', express.static('./node_modules/flatpickr/dist')); // redirect flatpickr
    app.use('/public/css', express.static('./node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
    app.use('/public/css', express.static('./node_modules/bootstrap-table/dist')); // redirect for bootstrap-table

    app.get('/', checkAuth, (req, res) => {
        res.render('index.html', { username: req.user.username });
    });

    app.get('/functions', checkAuth, (req, res) => {
        res.render('functions.html', {
            roles: 'ADMIN',
            title: packageJSON.name
        });
    });
    app.get('/customers', checkAuth, (req, res) => {
        res.render('customers.html', {
            roles: 'ADMIN',
            title: packageJSON.name
        });
    });
    app.get('/licenses', checkAuth, (req, res) => {
        res.render('licenses.html', {
            roles: 'ADMIN',
            title: packageJSON.name
        });
    });
    app.get('/system', checkAuth, (req, res) => {
        res.render('system.html', {
            roles: 'ADMIN',
            title: packageJSON.name
        });
    });

    app.get('/menu', checkAuth, (req, res) => {
        res.render('menu.html', {
            roles: 'ADMIN',
        });
    });

    app.get('/header', checkAuth, (req, res) => {
        res.render('header.html', {
            username: req.user.username,
            user_id: req.user._id,
            roles: 'ADMIN',
            current_time: new Date(),
            version: packageJSON.version
        });
    });

    app.get('/about', (req, res) => {
        res.send({
            version: packageJSON.version,
            author: packageJSON.author
        });
    });

    app.post('/login', async (req, res) => {
        try {
            let user = await UsersModel.findOne({username: {$regex: _.escapeRegExp(req.body.username), $options: "i"}}).lean().exec();
            if(user != void(0) && bcrypt.compareSync(req.body.password, user.password)) {
                const token = createToken({id: user._id, username: user.username});
                res.cookie('token', token, {
                    httpOnly: true
                });
                const accessToken = createAccessToken({id: user._id, username: user.role});
                res.cookie('access_token', accessToken, {
                    httpOnly: true
                });
                res.cookie('user_guid', user._id, {
                    httpOnly: false
                });

                res.status(200).send({message: "User login success."});
            } else res.status(400).send({message: "User not exist or password not correct"});
        } catch (e) {
            console.error("E, login,", e);
            res.status(500).send({message: "some error"});
        }
    });

    app.post('/register', async (req, res) => {
        try {
            let user = await UsersModel.findOne({username: {$regex: _.escapeRegExp(req.body.username), $options: "i"}}).lean().exec();
            if(user != void(0)) return res.status(400).send({message: "User already exist"});

            user = await UsersModel.create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                role: 'GUEST'
            });

            const token = createToken({id: user._id, username: user.username});
            res.cookie('token', token, {
                httpOnly: true
            });
            const accessToken = createAccessToken({id: user._id, username: user.role});
            res.cookie('access_token', accessToken, {
                httpOnly: true
            });
            res.cookie('user_guid', user._id, {
                httpOnly: false
            });

            res.status(200).send({message: "User created."});

        } catch (e) {
            console.error("E, register,", e);
            res.status(500).send({message: "some error"});
        }
    });

    app.post('/logout', (req, res) => {
        res.clearCookie('token');
        res.clearCookie('access_token');
        res.clearCookie('user_guid');
        res.status(200).send({message: "Logout success."});
    });

    app.get('/api/v1/functions', functionsController.all);
    app.post('/api/v1/functions', functionsController.create);
    app.get('/api/v1/functions/:id', functionsController.findById);
    app.put('/api/v1/functions/:id', functionsController.update);
    // app.delete('/api/v1/functions/:id', functionsController.delete);

    app.get('/api/v1/customers', customersController.find);
    app.post('/api/v1/customers', customersController.create);
    // app.get('/api/v1/customers/:id', customersController.findById);
    app.put('/api/v1/customers/:id', customersController.update);
    // app.delete('/api/v1/customers/:id', functionsController.delete);

    app.get('/api/v1/licenses', licensesController.find);
    app.post('/api/v1/licenses', licensesController.create);
    app.get('/api/v1/licenses/:id', licensesController.findById);
    app.put('/api/v1/licenses/:id', licensesController.update);

    // app.get('/api/v1/licenses/download/:id', customersController.all);
    // app.post('/api/v1/licenses/upload/:id', customersController.all);

    app.get('/api/v1/users', usersController.all);
    app.get('/api/v1/users/:id', usersController.findById);
    app.put('/api/v1/users/:id', usersController.update);
    app.put('/api/v1/security/:id', usersController.changePassword);
};