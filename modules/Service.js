module.exports = class Service {
    constructor(id, url, name){
        this.name = name;
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
    getName(){
        return this.name;
    }
    getStatus(){
        return this.status;
    }
    changeValues(status, timestamp){
        this.status = status;
        this.timestamp = timestamp;
    }
}