const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_USER,
    pass: process.env.KEY_USER,
  }
});

const emailForgotPassword = (user,verificationLink) => {
let mensajeHTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer Contraseña</title>
</head>
<body style="width: 100%; height: 100%; padding: 0; margin: 0;">
    <div style="background-color: #FAFAFA;">
        <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border-spacing: 0; padding: 0; margin: 0; width: 100%; height: 100%; background-repeat: repeat; background-position: center top; background-color: #FAFAFA;">
            <tr>
                <td valign="top" style="padding: 0; margin: 0;">
                    <table align="center" role="none" style="border-collapse: collapse; border-spacing: 0; width: 100%; table-layout: fixed !important; background-color: transparent; width: 600px;">
                        <tr>
                            <td align="center" bgcolor="#ffffff" style="padding: 0; margin: 0; background-color: #ffffff;">
                                <table align="center" cellpadding="0" cellspacing="0" role="none" style="border-collapse: collapse; border-spacing: 0; background-color: #0f3054; width: 600px;">
                                    <tr>
                                        <td align="left" style="margin: 0; padding-top: 10px; padding-right: 20px; padding-bottom: 10px; padding-left: 20px;">
                                            <h1 style="margin: 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 46px; font-weight: bold; line-height: 55px; color: #333333;">Restablecer Contraseña</h1>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table align="center" role="none" style="border-collapse: collapse; border-spacing: 0; width: 100%; table-layout: fixed !important; background-color: transparent;">
                        <tr>
                            <td align="center" bgcolor="#ffffff" style="padding: 0; margin: 0; background-color: #ffffff;">
                                <table bgcolor="#ffffff" style="border-collapse: collapse; border-spacing: 0; background-color: #FFFFFF; width: 600px;">
                                    <tr>
                                        <td align="left" style="margin: 0; padding-right: 20px; padding-left: 20px; padding-top: 15px;">
                                            <h2 style="margin: 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333333;">Hemos recibido una solicitud para restablecer tu contraseña.</h2>
                                            <p style="margin: 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; line-height: 19px; color: #333333;">
                                                Por favor, sigue el enlace a continuación para restablecer tu contraseña. Este enlace expira en 60 minutos.
                                            </p>
                                            <p style="margin: 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; line-height: 19px; color: #333333;">
                                                Si no solicitaste este cambio, puedes ignorar este mensaje.
                                            </p>
                                            <a href=${verificationLink} style="text-decoration: none; background-color: #0f3054; color: #ffffff; padding: 10px 20px; border-radius: 6px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px;">Restablecer Contraseña</a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`

  transporter.verify()
  .then(() => {
      console.log('Transporter verificado correctamente');
  })
  .catch((error) => {
      console.error('Error al verificar el transporter:', error);
  });

transporter.sendMail({
    from: '"Restablecimiento de contraseña" <henrypfg8@gmail.com>', // address
    to: user.email, // list of receivers
    subject: "Email de restablecimiento de contraseña", // Subject line
    text: "", // plain text body
    html: mensajeHTML, // html body
}).then(info => {
    //console.log(info);
}).catch(error => {
    console.error('Error al enviar el correo electrónico:', error);
});
}

module.exports = {emailForgotPassword};


