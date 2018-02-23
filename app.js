require('dotenv').config();
const io = require('socket.io')();
const request = require('request');
const nodemailer = require('nodemailer');
const Service = require('./modules/Service');
const Mail = require('./modules/Mail');
const express = require('express');
const Scheduler = require('./modules/Schedule');
const chalk = require('chalk');
const mongoose = require('mongoose');
const mongoClient = require('./modules/Mongo');
const async = require('async');
const app = express();
mongoose.connect(process.env.DB_HOST);

mongoClient.connect(function(err){
    err ? console.log(err) : null;
});

app.set('view engine', 'ejs');

io.listen(process.env.SOCKETS_PORT);
console.log(chalk.hex('#00F900')('Sockets are listening on port: ' + process.env.SOCKETS_PORT));

// let mailer = new Mail(nodemailer, chalk);

Service.find({}, (err, res) => {
    res.forEach((service) => {
        runTestServiceStatus(service);
    });
    // Scheduler.startDailyMail(function () {
    //     mailer.sendMail(res);
    // });
});

// mailer.testConnection();

io.on('connection', (client) => {
    console.log("client connected");
    io.sockets.emit('updateSockectsNumber', {
        sockets: Object.keys(io.sockets.server.engine.clients).length
    });

    client.on('disconnect', function () {
        console.log("client disconnected");
        io.sockets.emit('updateSockectsNumber', {
            sockets: Object.keys(io.sockets.server.engine.clients).length
        });
    });

    Service.find({}, (err, res) => {
        client.emit("servicelist", res);
    });

    client.on('changeOrder', (data) => {
        async.eachSeries(data, (obj, done) => {
            Service.update({id: obj}, { $set: {order: data.indexOf(obj)}}, (err) => {
                console.log(err);
                done();
            });

        }, (err) => {
            Service.find({}, (err, res) => {
                io.sockets.emit("servicelist", res);
            });
        });
    });

});

function runTestServiceStatus(service) {
    console.log("Run test service (" + chalk.hex('#FF0572')(service.getName()) + ") Time: " + chalk.hex('#FF0572')(service.getTime()) + "");
    request.get(service.getUrl()).on('error', function (error) {
        service.setStatus(error, (updatedService) => {
            io.sockets.emit('updateStatus', {
                updatedService
            });
            mailer.sendErrorMail(updatedService);
        });
        Service.findOneAndUpdate({
            id: service.getId()
        }, service, {}, function (err) {
            if (err) console.log(err);
        });
    }).on('response', function (response) {
        service.setStatus(response.statusCode, (updatedService) => {
            io.sockets.emit('updateStatus', {
                updatedService
            });
        });
        Service.findOneAndUpdate({
            id: service.getId()
        }, service, {}, function (err, test) {
            if (err) console.log(err);
        });
    });
}