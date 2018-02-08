module.exports = class Service {
    constructor(id, url, name){
        this.name = name;
        this.id = id;
        this.url = url;
        this.status = '';
        this.timestamp = new Date();
    }
    getUrl(){
        return this.url;
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getStatus(){
        return this.status.code != undefined ? this.status.code : this.status;
    }
    getTime(){
        return this.timestamp;
    }
    changeValues(status, timestamp){
        this.status = status;
        this.timestamp = timestamp;
    }
}