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
  const { name, furigana, telephone, email, message } = JSON.parse(event.body).payload.data

  console.log(user);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {user, pass},
  });

  console.log(event.body);

  let mailOptions = {
    from: `"きっとASP問い合わせ窓口" <kit-madoguchi@kitasp.com>`,
    to: `${email}`,
    subject: 'フォームを送信いたしました',
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