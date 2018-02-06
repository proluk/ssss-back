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
    sendOkMail(){
        this.transporter.sendMail({
            from: 'ssss-powiadomienia@gmail.com',
            to: ['Lukasz_Prokopiuk@wsip.com.pl','Sylwia_Besz-Miazga@wsip.com.pl'],
            subject: 'System Sprawdzający Stan Serwisów - SSSS Powiadomienia',
            html: {path: 'https://www.google.pl/search?q=snake+icon&dcr=0&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiruoeunZHZAhUC6CwKHfqCB3kQ_AUICigB&biw=1920&bih=1069'}
        });
    }
    sendErrorMail(){
        
    }
}