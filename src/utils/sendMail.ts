import nodemailer from 'nodemailer';
import handlebars from 'handlebars';

export default async function sendMail(to: string, name: string, url: string, subject: string, template: string) {
  const { MAILING_EMAIL, MAILING_PASSWORD, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT } = process.env;

  let transtporter = await nodemailer.createTransport({
    // service: 'gmail',
    // auth: {
    //   user: MAILING_EMAIL,
    //   pass: MAILING_PASSWORD,
    // },

    port: Number(SMTP_PORT),
    host: SMTP_HOST,
    auth: {
      user: MAILING_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const data = handlebars.compile(template);
  const replacement = {
    name,
    email_link: url,
  };

  const html = data(replacement);

  await new Promise((resolve, reject) => {
    transtporter.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Is listening');
        resolve(success);
      }
    });
  });

  const options = {
    from: MAILING_EMAIL,
    to,
    subject,
    html,
  };

  await new Promise((resolve, reject) => {
    transtporter.sendMail(options, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
}
