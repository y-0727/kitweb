require('dotenv').config();

const nodemailer = require('nodemailer');

const headers = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Credentials': true,
};

exports.handler = function(event, context, callback) {
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASSWORD;

  console.log(user);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {user, pass},
  });

  console.log(event.body);

  let mailOptions = {
    from: `"斉藤" <${user}>`,
    to: 'sigsig_eden1998@hotmail.co.jp',
    subject: 'Contact submission received!',
    messeage: 'test'
    html: '<p>メッセージを送信しました。</p>',
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      callback(error);
    } else {
      callback(null, {
        statusCode: 200,
        body: 'Ok',
      });
    }
  });
};