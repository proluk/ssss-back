const io = require('socket.io')();
const request = require('request');
const nodemailer = require('nodemailer');
const Service = require('./modules/Service');
const Mail = require('./modules/Mail');

let mailer = new Mail(nodemailer);
mailer.testConnection();
let services = {
    profimatura: new Service('profimatura','https://profimatura.pl'),
    profilingua: new Service('profilingua','https://www.profi-lingua.pl'),
    disneyenglishkursy: new Service('disneyenglishkursy','https://disneyenglishkursy.pl'),
    empikschool: new Service('empikschool','https://empikschool.com'),
    zdaszto: new Service('zdaszto','https://zdasz.to')
};

runTestServiceStatus(services.profimatura);
runTestServiceStatus(services.profilingua);
runTestServiceStatus(services.disneyenglishkursy);
runTestServiceStatus(services.empikschool);
runTestServiceStatus(services.zdaszto);

io.on('connection', (client) => {
    client.emit('setCurrentState',{
        services
    });
});

function runTestServiceStatus(service){
    console.log("Start testing function for service: "+service.getId());
    request.get(service.getUrl()).on('error', function(error){
        services[service.getId()].changeValues(JSON.stringify(error), new Date());
        io.sockets.emit('updateStatus', {
            service: service.getId(),
            timestamp: new Date(),
            status: JSON.stringify(error)
        });
        setTimeout(() => {
            runTestServiceStatus(service);
        }, 30000);
    }).on('response',function(response) {
        services[service.getId()].changeValues(response.statusCode, new Date());
        io.sockets.emit('updateStatus', {
            service: service.getId(),
            timestamp: new Date(),
            status: response.statusCode
        });
        setTimeout(() => {
            runTestServiceStatus(service);
        }, 30000);               
    });
}

const port = 8080;
io.listen(port);
console.log('listening on port ', port);