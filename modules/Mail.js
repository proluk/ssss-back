module.exports = class Mail {
    constructor(nodemailer, chalk){
        this.nodemailer = nodemailer;
        this.chalk = chalk;
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
        console.log(this.chalk.hex('#00F900')("Try to connect to SMTP..."));
        this.transporter.verify((err, suc) => {
            if ( err ) {
                console.log(this.chalk.hex('#FF050C')(err));
            } else {
                console.log(this.chalk.hex('#00F900')("Connected to SMTP"));
            }
        });
    }
    prepareHTML(array){
        let preparedHTML = '<ul>';
        for ( let i = 0 ; i < array.length ; i++ ){
            if ( array[i].getStatus() == '200' ){
                preparedHTML += '<li>'+array[i].getName()+' status: <span style="color: green;">OK</span></li>'
            } else {
                preparedHTML += '<li>'+array[i].getName()+' status: <span style="color: red;">'+array[i].getStatus()+'</span></li>'
            }
        }
        preparedHTML += '</ul>';
        return preparedHTML;
    }
    sendMail(array){
        this.transporter.sendMail({
            from: 'ssss-powiadomienia@gmail.com',
            to: ['Lukasz_Prokopiuk@wsip.com.pl','Sylwia_Besz-Miazga@wsip.com.pl','Artur_Stopinski@wsip.com.pl','Marcin_Lochowski@wsip.com.pl'],
            subject: 'IT - Powiadomienie z Systemu sprawdzającego stan serwisów ',
            html: this.prepareHTML(array)
        });
    }
    sendErrorMail(service){
        let preparedHTML = '<li>'+service.getName()+' status: <span style="color: red;">'+service.getStatus()+'</span></li>';
        this.transporter.sendMail({
            from: 'ssss-powiadomienia@gmail.com',
            to: ['Lukasz_Prokopiuk@wsip.com.pl','Sylwia_Besz-Miazga@wsip.com.pl','Artur_Stopinski@wsip.com.pl','Marcin_Lochowski@wsip.com.pl'],
            subject: 'Achtung! - IT - Powiadomienie z Systemu sprawdzającego stan serwisów',
            html: preparedHTML
        });
    }
}