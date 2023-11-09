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

const postNoti = (title , email) => {
    let mensajeHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="ES">
       <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title>Potenciar Solidario</title><!--[if (mso 16)]>
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
      .rollover:hover .rollover-first {
        max-height:0px!important;
        display:none!important;
        }
        .rollover:hover .rollover-second {
        max-height:none!important;
        display:inline-block!important;
        }
        .rollover div {
        font-size:0px;
        }
        u + .body img ~ div div {
        display:none;
        }
        #outlook a {
        padding:0;
        }
        span.MsoHyperlink,
      span.MsoHyperlinkFollowed {
        color:inherit;
        mso-style-priority:99;
        }
        a.es-button {
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
        .es-button-border:hover > a.es-button {
        color:#ffffff!important;
        }
      @media only screen and (max-width:600px) {.es-m-p0r { padding-right:0px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:36px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:12px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } }
      </style>
       </head>
       <body class="body" style="width:100%;height:100%;padding:0;Margin:0">
        <div dir="ltr" class="es-wrapper-color" lang="ES" style="background-color:#FAFAFA"><!--[if gte mso 9]>
                  <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" color="#fafafa"></v:fill>
                  </v:background>
              <![endif]-->
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
           <tr>
            <td valign="top" style="padding:0;Margin:0">
             <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
               <tr>
                <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#ffffff">
                 <table bgcolor="#0f3054" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#0f3054;width:600px" role="none">
                   <tr>
                    <td align="left" style="Margin:0;padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px">
                     <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://www.potenciarsolidario.org/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#666666;font-size:14px"><img src="https://fbniqsm.stripocdn.email/content/guids/CABINET_4fed3f2ea23695f2decdbcf710239cb9c76a61ada19c3e4d54c54f6857a82fdb/images/logohorizontalsimpleblancofps2022mz_1.png" alt="Logo" style="display:block;font-size:12px;border:0;outline:none;text-decoration:none" width="200" title="Logo" height="32"></a></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-content" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
               <tr>
                <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#ffffff">
                 <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                   <tr>
                    <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:15px">
                     <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" class="es-m-txt-c" bgcolor="transparent" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><h1 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:46px;font-style:normal;font-weight:bold;line-height:55px;color:#333333">Gracias por unirte a Potenciar Solidario!</h1></td>
                           </tr>
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:19px !important;letter-spacing:0;color:#333333;font-size:16px"><span style="line-height:150% !important">Queremos brindar dignidad y apoyo a quienes más lo necesitan. Nuestra misión es unir esfuerzos para restaurar derechos básicos, aliviar la vulnerabilidad y devolver la esperanza a quienes atendemos en Argentina</span>.</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                   <tr>
                    <td class="esdev-adapt-off" align="left" style="padding:20px;Margin:0">
                     <table cellpadding="0" cellspacing="0" class="esdev-mso-table" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                       <tr>
                        <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                         <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                           <tr class="es-mobile-hidden">
                            <td align="left" style="padding:0;Margin:0;width:146px">
                             <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr>
                                <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://fbniqsm.stripocdn.email/content/guids/CABINET_4fed3f2ea23695f2decdbcf710239cb9c76a61ada19c3e4d54c54f6857a82fdb/images/image.jpeg" alt="" width="141" height="79" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                        <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                         <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                           <tr>
                            <td align="left" style="padding:0;Margin:0;width:121px">
                             <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr>
                                <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://fbniqsm.stripocdn.email/content/guids/CABINET_4fed3f2ea23695f2decdbcf710239cb9c76a61ada19c3e4d54c54f6857a82fdb/images/317744153_468471062061303_422607282750888276_n.jpg" alt="" width="106" height="79" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                        <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                         <table cellpadding="0" cellspacing="0" class="es-left" align="left" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                           <tr>
                            <td align="left" style="padding:0;Margin:0;width:155px">
                             <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr>
                                <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://fbniqsm.stripocdn.email/content/guids/CABINET_4fed3f2ea23695f2decdbcf710239cb9c76a61ada19c3e4d54c54f6857a82fdb/images/image_Ykx.jpeg" alt="" width="150" height="80" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                        <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                         <table cellpadding="0" cellspacing="0" class="es-right" align="right" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                           <tr>
                            <td align="left" style="padding:0;Margin:0;width:138px">
                             <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr>
                                <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://fbniqsm.stripocdn.email/content/guids/CABINET_4fed3f2ea23695f2decdbcf710239cb9c76a61ada19c3e4d54c54f6857a82fdb/images/image_Xbp.jpeg" alt="" width="133" height="79" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                   <tr>
                    <td align="left" style="padding:0;Margin:0;padding-right:20px;padding-bottom:10px;padding-left:20px">
                     <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px" role="presentation">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#0f3054;border-width:0px;display:inline-block;border-radius:6px;width:auto"><a href="" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;padding:10px 30px 10px 30px;display:inline-block;background:#0f3054;border-radius:6px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #0f3054;border-left-width:30px;border-right-width:30px">Visitá nuestra cartelera</a></span></td>
                           </tr>
                           <tr>
                            <td align="left" bgcolor="transparent" style="padding:0;Margin:0;padding-bottom:10px;padding-top:20px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">¿Tienes alguna pregunta? Contáctanos a <a href="mailto:info@potenciarsolidario.org" target="_self" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px"><u>info@potenciarsolidario.org</u></a> o envíanos un WhatsApp al&nbsp;&nbsp;<a target="_blank" style="mso-line-height-rule:exactly;text-decoration:underline;color:#5C68E2;font-size:14px;line-height:21px" href="">11-2873-4419</a></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><br>Gracias,</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">El equipo de Potenciar Solidario!</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
               <tr>
                <td align="center" bgcolor="#ffffff" style="padding:0;Margin:0;background-color:#ffffff">
                 <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:640px" role="none">
                   <tr>
                    <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;padding-bottom:20px">
                     <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="left" style="padding:0;Margin:0;width:600px">
                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr>
                            <td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0">
                             <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr>
                                <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://www.facebook.com/fundacionpotenciarsolidario/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Facebook" src="https://fbniqsm.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="34" height="34" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                                <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://www.instagram.com/potenciarsolidario_/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Instagram" src="https://fbniqsm.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="34" height="34" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                                <td align="center" valign="top" style="padding:0;Margin:0;padding-right:40px"><a target="_blank" href="https://www.linkedin.com/company/fundacionpotenciarsolidario/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="Linkedin" src="https://fbniqsm.stripocdn.email/content/assets/img/social-icons/logo-black/linkedin-logo-black.png" alt="In" width="34" height="34" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                                <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://www.youtube.com/user/PotenciarSolidario" style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img title="" src="https://fbniqsm.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="34" height="34" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                               </tr>
                             </table></td>
                           </tr>
                           <tr>
                            <td align="center" bgcolor="#0f3054" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px !important;letter-spacing:0;color:#ffffff;font-size:12px">Potenciar Solidario © 2023. Todos los derechos reservados.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:24px !important;letter-spacing:0;color:#ffffff;font-size:12px">Juncal 3540, 7° Piso (CP.: 1425), CABA, Argentin3o54</p></td>
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
        from: '"Tu publicacion ah sido aceptada" <henrypfg8@gmail.com>', // address
        to: email, // list of receivers
        subject: `Tu publicacion sobre: ${title}`, // Subject line
        text: "", // plain text body
        html: "plantilla de publicacion aprobada", // html body
    }).then(info => {
        //console.log(info);
    }).catch(error => {
        console.error('Error al enviar el correo electrónico:', error);
    });
    }
    

module.exports = {postNoti}