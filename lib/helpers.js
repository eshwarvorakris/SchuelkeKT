const getPaginate = function (queryData, page = 0, limit = 15) {
    const { count: total, rows: data } = queryData;
    const current_page = page + 1;
    const total_page = Math.ceil(total / limit);

    return { data, meta: { total, current_page, total_page, from: (page * limit) + 1, to: (total > (page * limit)) ? total : (current_page * limit) } };
}

async function sendMail(emailTo, mailSubject, mailHtml) {
    const nodemailer = require('nodemailer');
    //console.log("====================================mail triggered===============================");
    // let config = {
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
    //     auth: {
    //         user: process.env.EMAIL_USER, // generated ethereal user
    //         pass: process.env.EMAIL_PASS, // generated ethereal password
    //     },
    // }
    let config = {
        service: "Outlook365",
        auth: {
            user: process.env.EMAIL_USER, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
        },
    }
    let transporter = nodemailer.createTransport(config);


    let message = {
        from: process.env.EMAIL_FROM, // sender address
        to: emailTo, // list of receivers
        subject: mailSubject, // Subject line
        html: mailHtml, // html body
    }


    transporter.sendMail(message).then((info) => {
        console.log("====================================mail sent===============================", info);
        return {
            msg: "message sent"
        }
    }).catch(error => {
        console.log("====================================mailerroor===============================");
        console.log(error)
        return {
            msg: "message not sent",
            error: error
        }
    })
}
module.exports = { getPaginate, sendMail }