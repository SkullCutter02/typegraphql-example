import nodemailer, { SendMailOptions, getTestMessageUrl } from "nodemailer";

const sendEmail = async (email: string, url: string) => {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const mailOptions: SendMailOptions = {
    from: "foo@example.com",
    to: email,
    subject: "Hello",
    text: url,
    html: `<a href="${url}">${url}</a>`,
  };

  const info = await transporter.sendMail(mailOptions);

  console.log(`Message sent: ${info.messageId}`);
  console.log(`Preview url: ${getTestMessageUrl(info)}`);
};

export default sendEmail;
