var mongoose = require('mongoose');
const Service = require('./modules/Service');
var services = require('./fixtures/services');

mongoose.connect('mongodb://127.0.0.1/ssss');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var arr = [];
var test = new Service();

Service.find({}, (err, res) => {
    if ( res.length > 0 ) {
        res.forEach((service) => {
            arr = compare(service.id);
        });
        Service.insertMany(arr, function(err, res){
            console.log(res.length+' services added');
        });
    } else {
        Service.insertMany(services, function(err, res){
            console.log(res.length+' services added');
        });
    }
});

function compare(id_model) {
    services.forEach(function(service, index){
        if(id_model === service.id ) {
            services.splice(index, 1);
        }
    });
    return services;
}
