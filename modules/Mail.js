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
            to: ['Lukasz_Prokopiuk@wsip.com.pl'],
            subject: 'IT - Powiadomienie z Systemu sprawdzającego stan serwisów ',
            html: `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>IT - System Sprawdzający Stan Serwisów</title>
                </head>
                <body style="padding: 0; margin: 0;">
                    <style type="text/css">
                        @import url('https://fonts.googleapis.com/css?family=Audiowide|Righteous|Russo+One');
                    </style> 
                    <div style="display: block; background-color: #000; color: #fff; font-family: 'Audiowide', cursive;">
                        <%- include logo.ejs %>
                        <div style="display: inline-block; vertical-align: middle;">
                            <span style="font-size: 40px;">S<sup>4</sup></span>
                            <span style="display: block;">SYSTEM SPRAWDZAJĄCY STAN SERWISÓW</span>
                        </div>
                    </div>
                    Raport
                </body>
            </html>`;
        });
    }
    sendErrorMail(){

    }
}