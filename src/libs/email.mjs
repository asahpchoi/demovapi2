import nodemailer from 'nodemailer';


const mailOption = {
    service: "hotmail",
    auth: {
        user: "gpthktest@outlook.com",
        pass: "hpchoi77hpchoi77"
    }
}

export const sendEmail = async (to, subject, body) => {
    const transporter = nodemailer.createTransport(mailOption);


    const options = {
        from: 'gpthktest@outlook.com',
        to: to,
        subject: subject,
        html: body,
    };

    await transporter.sendMail(options);
}