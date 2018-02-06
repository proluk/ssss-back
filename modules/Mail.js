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
        let preparedHTML = 'Raport </br><ul>';
        for ( let i = 0 ; i < array.length ; i++ ){
            if ( array[i].getStatus() == '200' ){
                preparedHTML += '<li>'+array[i].getId()+' Status: <span style="color: green;">OK</span></li>'
            } else {
                preparedHTML += '<li>'+array[i].getId()+' Status: <span style="color: red;">'+array[i].getStatus()+'</span></li>'
            }
        }
        preparedHTML += '</ul>';
        return preparedHTML;
    }
    sendOkMail(array){
        this.transporter.sendMail({
            from: 'ssss-powiadomienia@gmail.com',
            to: ['Lukasz_Prokopiuk@wsip.com.pl','Sylwia_Besz-Miazga@wsip.com.pl','Artur_Stopinski@wsip.com.pl'],
            subject: 'IT - Powiadomienie z Systemu sprawdzającego stan serwisów ',
            html: this.prepareHTML(array)
        });
    }
    sendErrorMail(service){
        let preparedHTML = 'Raport :</br><li>'+service.getId()+' Status: <span style="color: red;">'+service.getStatus()+'</span></li>';
        this.transporter.sendMail({
            from: 'ssss-powiadomienia@gmail.com',
            to: ['Lukasz_Prokopiuk@wsip.com.pl','Sylwia_Besz-Miazga@wsip.com.pl','Artur_Stopinski@wsip.com.pl'],
            subject: 'IT - Powiadomienie z Systemu sprawdzającego stan serwisów - Achtung!',
            html: preparedHTML
        });
    }
}