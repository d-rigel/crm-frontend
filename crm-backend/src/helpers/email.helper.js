const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "maureen.anderson80@ethereal.email",
    pass: "k6BnFF7mn6tBdsx5xb",
  },
});

// const send = () => {};

const mailProcessor = async (email, pin) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"From CRM Company 👻" <maureen.anderson80@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "Password reset pin", // Subject line
    text:
      "Here is your password reset pin " +
      pin +
      " This pin will expire in 1 day", // plain text body
    html: `<b>Hello world?</b> 
    Here is your pin <b>${pin}</b>
    This pin will expire in 1 day
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  mailProcessor().catch(console.error);
};

module.exports = {
  mailProcessor,
};
