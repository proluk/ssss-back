module.exports = class Mail {
    constructor(nodemailer){
        this.nodemailer = nodemailer;
        this.smtp = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user:'wsip.smtp@gmail.com',
                pass:'WSiP@SMTP'
            }
        }
        this.transporter = this.nodemailer.createTransport(this.smtp);
    }
    testConnection(){
        this.transporter.verify(function(err, suc){
            if ( err ) {
                console.log(err);
            } else {
                console.log("Connected to SMTP");
            }
        });
    }
    prepareHTML(array){
        let preparedHTML = 'Raport S4:</br><ul>';
        for ( let i = 0 ; i < array.length ; i++ ){
            if ( array[i].getStatus() != '200' ){
                preparedHTML += '<li>'+array[i].getId()+': <span style="color: red;">'+array[i].getStatus()+'</span></li>'
            } else {
                preparedHTML += '<li>'+array[i].getId()+': <span style="color: green;">'+array[i].getStatus()+'</span></li>'
            }
        }
        preparedHTML += '</ul>';
        return preparedHTML;
    }
    sendOkMail(array){
        this.transporter.sendMail({
            from: 'ssss-powiadomienia@gmail.com',
            to: ['Lukasz_Prokopiuk@wsip.com.pl'],
            subject: 'IT - Powiadomienie z Systemu sprawdzającego stan serwisów ',
            html: this.prepareHTML(array)
        });
    }
    sendErrorMail(service){
        preparedHTML += 'Raport S4:</br><li>'+service.getId()+': <span style="color: red;">'+service.getStatus()+'</span></li>';
    }
}