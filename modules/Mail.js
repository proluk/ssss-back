require('dotenv').config();

module.exports = class Mail {
    constructor(nodemailer, chalk) {
        this.nodemailer = nodemailer;
        this.chalk = chalk;
        this.smtp = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        };
        this.transporter = this.nodemailer.createTransport(this.smtp);
    }
    testConnection() {
        console.log(this.chalk.hex('#00F900')("Try to connect to SMTP..."));
        this.transporter.verify((err, suc) => {
            if (err) {
                console.log(this.chalk.hex('#FF050C')(err));
            } else {
                console.log(this.chalk.hex('#00F900')("Connected to SMTP"));
            }
        });
    }
    prepareHTML(array) {
        let preparedHTML = 'Raport:<br/><ul>';
        for (let i = 0; i < array.length; i++) {
            if (array[i].getStatus() == '200') {
                preparedHTML += '<li>' + array[i].getName() + ' status: <span style="color: green;">OK</span></li>';
            } else {
                preparedHTML += '<li>' + array[i].getName() + ' status: <span style="color: red;">' + array[i].getStatus() + '</span></li>';
            }
        }
        preparedHTML += '</ul>';
        return preparedHTML;
    }
    sendMail(array) {
        this.transporter.sendMail({
            from: 'ssss-powiadomienia@gmail.com',
            to: ['Lukasz_Prokopiuk@wsip.com.pl', 'Sylwia_Besz-Miazga@wsip.com.pl', 'Artur_Stopinski@wsip.com.pl', 'Marcin_Lochowski@wsip.com.pl'],
            subject: 'IT - Powiadomienie z Systemu sprawdzającego stan serwisów ',
            html: this.prepareHTML(array)
        });
    }
    sendErrorMail(service) {
        let preparedHTML = 'Raport:<br/><ul><li>' + service.getName() + ' status: <span style="color: red;">' + service.getStatus() + '</span></li></ul>';
        this.transporter.sendMail({
            from: 'ssss-powiadomienia@gmail.com',
            to: ['Lukasz_Prokopiuk@wsip.com.pl', 'Sylwia_Besz-Miazga@wsip.com.pl', 'Artur_Stopinski@wsip.com.pl', 'Marcin_Lochowski@wsip.com.pl'],
            subject: 'UWAGA! - IT - Powiadomienie z Systemu sprawdzającego stan serwisów',
            html: preparedHTML
        });
    }
};