const mongo = require('mongodb');

class MongoClient{
    constructor(mongo){
        this._db;
    }
    connect(callback){
        mongo.connect(process.env.DB_HOST, (err, db) => {
            this._db = db
            return callback(err);
        });
    }
    getDb(){
        return this._db;
    }
}

module.exports = new MongoClient(mongo);