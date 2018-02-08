const io = require('socket.io')();
const request = require('request');
const nodemailer = require('nodemailer');
const Service = require('./modules/Service');
const Mail = require('./modules/Mail');
const express = require('express');
const Scheduler = require('./modules/Schedule');
const chalk = require('chalk');
const app = express();
const port = 8082;

app.set('view engine', 'ejs');

io.listen(port);
console.log(chalk.hex('#00F900')('Sockets are listening on port: '+port));

let mailer = new Mail(nodemailer, chalk);

let services = {
    profimatura: new Service('profimatura','https://profimatura.pl','profimatura.pl'),
    profilingua: new Service('profilingua','https://www.profi-lingua.pl','profi-lingua.pl'),
    disneyenglishkursy: new Service('disneyenglishkursy','https://disneyenglishkursy.pl','disneyenglishkursy.pl'),
    empikschool: new Service('empikschool','https://empikschool.com','empikschool.com'),
    zdaszto: new Service('zdaszto','https://zdasz.to','zdasz.to'),
    profikids: new Service('profikids','https://profikids.pl','profikids.pl')
};

runTestServiceStatus(services.profimatura);
runTestServiceStatus(services.profilingua);
runTestServiceStatus(services.disneyenglishkursy);
runTestServiceStatus(services.empikschool);
runTestServiceStatus(services.zdaszto);
runTestServiceStatus(services.profikids);

Scheduler.startDailyMail(function(){
    mailer.sendMail([
        services.profimatura,
        services.profilingua,
        services.disneyenglishkursy,
        services.empikschool,
        services.zdaszto,
        services.profikids
    ]);
});



mailer.testConnection();

io.on('connection', (client) => {

    io.sockets.emit('updateSockectsNumber',{sockets: Object.keys(io.sockets.server.engine.clients).length});

    client.on('disconnect', function(){
        io.sockets.emit('updateSockectsNumber',{sockets: Object.keys(io.sockets.server.engine.clients).length});
    });

    client.emit('setCurrentState',{
        services
    });

});

function runTestServiceStatus(service){
    console.log("Run test service ("+chalk.hex('#FF0572')(service.getName())+") Time: "+chalk.hex('#FF0572')(service.getTime())+"");
    request.get(service.getUrl()).on('error', function(error){
        services[service.getId()].changeValues(error, new Date());
        io.sockets.emit('updateStatus', {
            service: service.getId(),
            timestamp: new Date(),
            status: error
        });
        mailer.sendErrorMail(service);
        setTimeout(() => {
            runTestServiceStatus(service);
        }, 1800000);
    }).on('response',function(response) {
        services[service.getId()].changeValues(response.statusCode, new Date());
        io.sockets.emit('updateStatus', {
            service: service.getId(),
            timestamp: new Date(),
            status: response.statusCode
        });
        setTimeout(() => {
            runTestServiceStatus(service);
        }, 1800000);               
    });
}