module.exports = class Service {
    constructor(id, url){
        this.id = id;
        this.url = url;
        this.status = '';
        this.timestamp = '';
    }
    getUrl(){
        return this.url;
    }
    getId(){
        return this.id;
    }
    changeValues(status, timestamp){
        this.status = status;
        this.timestamp = timestamp;
    }
}