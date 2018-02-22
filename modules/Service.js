var mongoose = require('mongoose');
var test = require('socket.io');


var serviceSchema = mongoose.Schema({
    name: {
        type: String,
    },
    id: {
        type: String,
    },
    url: {
        type: String
    },
    status: {
        type: String,
        default: ""
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    order: {
        type: Number,
        default: 0
    }
});

serviceSchema.methods.getUrl = function () {
    return this.url;
};

serviceSchema.methods.getId = function () {
    return this.id;
};

serviceSchema.methods.getName = function () {
    return this.name;
};

serviceSchema.methods.getStatus = function () {
    if (this.status.code != undefined) {
        if (this.status.code == 'EAI_AGAIN') {
            return 'DNS lookup timed out error';
        } else {
            return this.status.code;
        }
    } else {
        return this.status;
    }
};

serviceSchema.methods.getTime = function () {
    return this.timestamp;
};

// serviceSchema.methods.changeValues = function (status, timestamp, callback) {
//     this.status = status;
//     this.timestamp = timestamp;
//     callback(this);
// };

serviceSchema.methods.setStatus = function(status, callback) {
    this.status = status;
    this.timestamp = new Date();
    callback(this);
};

var Service = module.exports = mongoose.model('service', serviceSchema);