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

module.exports = app => {
    app.use('/assets', express.static('./client/public'));
    app.use('/public/js', express.static('./node_modules/bootstrap/dist/js')); // redirect bootstrap JS
    app.use('/public/js', express.static('./node_modules/jquery/dist')); // redirect JS jQuery
    app.use('/public/js', express.static('./node_modules/ajax/lib')); // redirect AJAX
    app.use('/public/css', express.static('./node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

    app.get('/', checkAuth, (req, res) => {
        res.render('index.html', { username: req.user.username });
    });

    app.get('/functions', (req, res) => {
        res.render('functions.html', {
            username: 'Test admin',
            roles: 'ADMIN',
            current_time: new Date(),
            version: packageJSON.version
        });
    });
    app.get('/customers', (req, res) => {
        res.render('customers.html', {
            username: 'Test admin',
            roles: 'ADMIN',
            current_time: new Date(),
            version: packageJSON.version
        });
    });
    app.get('/licenses', (req, res) => {
        res.render('licenses.html', {
            username: 'Test admin',
            roles: 'GUEST',
            current_time: new Date(),
            version: packageJSON.version
        });
    });
    app.get('/system', (req, res) => {
        res.render('system.html', {
            username: 'Test admin',
            roles: 'GUEST',
            current_time: new Date(),
            version: packageJSON.version
        });
    });

    app.get('/menu', (req, res) => {
        res.render('menu.html', {
            roles: 'ADMIN',
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
                password: req.body.password
            });

            const token = createToken({id: user._id, username: user.username});

            res.cookie('token', token, {
                httpOnly: true
            });

            res.status(200).send({message: "User created."});

        } catch (e) {
            console.error("E, register,", e);
            res.status(500).send({message: "some error"});
        }
    });

    app.post('/logout', (req, res) => {
        res.clearCookie('token');
        res.status(200).send({message: "Logout success."});
    });

    app.get('/api/v1/functions', functionsController.all);
    app.post('/api/v1/functions', functionsController.create);
    app.get('/api/v1/functions/:id', functionsController.findById);
    app.put('/api/v1/functions/:id', functionsController.update);
    // app.delete('/api/v1/functions/:id', functionsController.delete);
};