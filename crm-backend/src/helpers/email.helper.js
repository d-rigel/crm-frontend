const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "jack.koepp@ethereal.email",
//     pass: "vxFBtuY3tprjBq6rXj",
//   },
// });

// const send = () => {
//rough code
// switch (type) {
//   case "request-new-password":
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"From CRM Company 👻" <jack.koepp@ethereal.email>', // sender address
//       to: email, // list of receivers
//       subject: "Password reset pin", // Subject line
//       text:
//         "Here is your password reset pin " +
//         pin +
//         " This pin will expire in 1 day", // plain text body
//       html: `<b>Hello world?</b>
//   Here is your pin <b>${pin}</b>
//   This pin will expire in 1 day
//   `, // html body
//     });
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     mailProcessor().catch(console.error);
//     break;
// case "password-update-success":
//   // send mail with defined transport object
//   let infos = await transporter.sendMail({
//     from: '"From CRM Company 👻" <jack.koepp@ethereal.email>', // sender address
//     to: email, // list of receivers
//     subject: "Password updated", // Subject line
//     text: "Your new password has been updated", // plain text body
//     html: `<b>Hello</b>
//     Your new password has been updated
// `, // html body
//   });
//   console.log("Message sent: %s", infos.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(infos));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   mailProcessor().catch(console.error);
// break;
// default:
// break;
// }
// };

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "amely.considine97@ethereal.email",
    pass: "P6wc5MUTprR5YJtsb1",
  },
});
const mailProcessor = async (email, pin) => {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"From CRM Company 👻" <jack.koepp@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "Password reset pin", // Subject line
    text:
      "Here is your password reset pin " +
      pin +
      " This pin will expire in 1 day", // plain text body
    html: `<b>Hello!!!</b>
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

const mailProcessorUpdate = async (email) => {
  // send mail with defined transport object
  let infos = await transporter.sendMail({
    from: '"From CRM Company 👻" <jack.koepp@ethereal.email>', // sender address
    to: email, // list of receivers
    subject: "Password updated", // Subject line
    text: "Your new password has been updated", // plain text body
    html: `<b>Hello</b>
        Your new password has been updated
    `, // html body
  });
  console.log("Message sent: %s", infos.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(infos));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  mailProcessor().catch(console.error);
};

const newUserConfirmation = async ({ email, verificationLink = "" }) => {
  // send mail with defined transport object
  let infos = await transporter.sendMail({
    from: '"From CRM Company 👻" <amely.considine97@ethereal.email>', // sender address
    to: "<amely.considine97@ethereal.email>", // list of receivers
    subject: "Please verify your new user", // Subject line
    text: "Please follow the link to verify your account before you can login", // plain text body
    html: `<b>Hello</b>
        <p>Please follow the link to verify your account before you can login</p>
        <p>${verificationLink}</p>
    `, // html body
  });
  console.log("Message sent: %s", infos.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(infos));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  newUserConfirmation().catch(console.error);
  console.log("I'm from verification email function");
};

module.exports = {
  mailProcessor,
  mailProcessorUpdate,
  newUserConfirmation,
};
