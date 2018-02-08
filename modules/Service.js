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
        if ( this.status.code != undefined ) {
            if ( this.status.code == 'EAI_AGAIN' ) {
                return 'DNS lookup timed out error';
            } else {
                return this.status.code;
            }
        } else {
            return this.status
        }
    }
    getTime(){
        return this.timestamp;
    }
    changeValues(status, timestamp){
        this.status = status;
        this.timestamp = timestamp;
    }
}