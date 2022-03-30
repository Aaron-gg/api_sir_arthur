const nodemailer = require('nodemailer');

module.exports = (code, email) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'uagg.296246@gmail.com',
            pass: 'uagg19981107'
        }
    });

    const mailOptions = {
        from: "'Rolando Recover Password' <uagg.296246@gmail.com>",
        //to: 'ulises@apolo25.com',//test
        to: email,
        subject: "Recover password asunto",
        html: ` <strong>Codigo:</strong> ${code} <br>
        <strong>>:v/</strong>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
    });
}