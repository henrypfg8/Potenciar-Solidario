const nodemailer = require('nodemailer');
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
})

const userBanNoti = (userEmail) => {
    let mensajeHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="und">
     <head>
      <meta charset="UTF-8">
      <meta content="width=device-width, initial-scale=1" name="viewport">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta content="telephone=no" name="format-detection">
      <title>Empty template</title><!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
      <style type="text/css">
    #outlook a {
        padding:0;
    }
    .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
    }
    .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important; text-align:left } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important; text-align:left } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important; text-align:left } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:18px!important; display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
    </style>
     </head>
     <body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
      <div dir="ltr" class="es-wrapper-color" lang="und" style="background-color:#F6F6F6"><!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#f6f6f6"></v:fill>
                </v:background>
            <![endif]-->
       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6">
         <tr>
          <td valign="top" style="padding:0;Margin:0">
           <table class="es-header" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
             <tr>
              <td align="center" style="padding:0;Margin:0">
               <table class="es-header-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                 <tr>
                  <td align="left" bgcolor="#0f3054" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;background-color:#0f3054">
                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.potenciarsolidario.org/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img src="https://ebrnymk.stripocdn.email/content/guids/CABINET_4fed3f2ea23695f2decdbcf710239cb9c76a61ada19c3e4d54c54f6857a82fdb/images/logohorizontalsimpleblancofps2022mz_1.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="200" height="32"></a></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
                 <tr>
                  <td align="left" style="padding:0;Margin:0">
                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://ebrnymk.stripocdn.email/content/guids/CABINET_ef5722ff96218a4dd654dd86c52478d7a03af90fd3d0d6db5d187618e19476d2/images/6lock_password_padlock_privacy_ui256.png" alt width="120" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="120"></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
                 <tr>
                  <td align="left" style="padding:0;Margin:0;padding-bottom:10px;padding-left:15px;padding-right:20px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:565px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:55px;color:#333333;font-size:46px"><strong>¡Tu cuenta ha sido suspendida!&nbsp;</strong></p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table>
           <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
             <tr>
              <td align="center" style="padding:0;Margin:0">
               <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px">
                   <table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#333333;font-size:16px">Desafortunamente, esta medida se ha tomado tras una exhaustiva revisión de tu actividad en la plataforma, donde se identificaron diferentes motivos que han llevado a esta decisión.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#333333;font-size:16px">Comprendemos que esta noticia puede generar inquietud. En este momento, no podemos proporcionar detalles específicos sobre las razones de la suspensión, pero queremos asegurarte que esta acción se ha llevado a cabo de acuerdo con nuestras políticas, con el objetivo de mantener un entorno seguro y respetuoso para todos los miembros de nuestra comunidad.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#333333;font-size:16px"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#333333;font-size:16px">Agradecemos tu comprensión durante este proceso y valoramos tu participación en Fundacion Potenciar Solidario.&nbsp;</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px;color:#333333;font-size:16px"><br>Si tienes alguna pregunta o inquitud, no dudes en ponerte en contacto con nuestro equipo de soporte en <a href="mailto:info@potenciarsolidario.org" target="_self" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#0b5394;font-size:14px">info@potenciarsolidario.org</a> o a través de nuestro WhatsApp al <a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#0b5394;font-size:14px" href="">11-2873-4419</a></p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table>
           <table class="es-footer" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
             <tr>
              <td align="center" style="padding:0;Margin:0">
               <table class="es-footer-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;padding-top:10px;padding-left:20px;padding-right:20px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0;padding-top:5px;padding-bottom:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:19px;color:#333333;font-size:16px">Gracias por tu comprensión y cooperación.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:19px;color:#333333;font-size:16px">Atentamente: El equipo de Potenciar Solidario</p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
                 <tr>
                  <td align="left" bgcolor="#0f3054" style="padding:15px;Margin:0;background-color:#0f3054">
                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:570px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0;font-size:0">
                           <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://www.facebook.com/fundacionpotenciarsolidario/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img src="https://ebrnymk.stripocdn.email/content/assets/img/social-icons/circle-white-bordered/facebook-circle-white-bordered.png" alt="Fb" title="Facebook" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                              <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://www.instagram.com/potenciarsolidario_/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img src="https://ebrnymk.stripocdn.email/content/assets/img/social-icons/circle-white-bordered/instagram-circle-white-bordered.png" alt="Ig" title="Instagram" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                              <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://www.linkedin.com/company/fundacionpotenciarsolidario/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img src="https://ebrnymk.stripocdn.email/content/assets/img/social-icons/circle-white-bordered/linkedin-circle-white-bordered.png" alt="In" title="Linkedin" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                              <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://www.youtube.com/user/PotenciarSolidario" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img src="https://ebrnymk.stripocdn.email/content/assets/img/social-icons/circle-white-bordered/youtube-circle-white-bordered.png" alt="Yt" title="Youtube" width="32" height="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
                 <tr>
                  <td align="left" bgcolor="#0f3054" style="padding:0;Margin:0;background-color:#0f3054">
                   <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                     <tr>
                      <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                       <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                         <tr>
                          <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ffffff;font-size:14px">Potenciar Solidario <span style="font-size:12px;line-height:18px"></span>© 2023. Todos los derechos reservados.</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ffffff;font-size:14px">Juncal 3540, 7° Piso (CP.: 1425), CABA, Argentin3o54</p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
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
        from: '"Tu cuenta ha sido suspendida" <henrypfg8@gmail.com>', // address
        to: userEmail , // list of receivers
        subject: `usuario suspendido`, // Subject line
        text: "", // plain text body
        html: mensajeHTML, // html body
    }).then(info => {
    }).catch(error => {
        console.error('Error al enviar el correo electrónico:', error);
    });

}

module.exports = {userBanNoti}


