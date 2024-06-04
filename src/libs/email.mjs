import axiox from 'axios';

export const sendEmail = async (to, subject, body) => {
    console.log('sendmail', { to, subject, body })
    try {
        const url = "https://hook.eu2.make.com/ncqyrjl3kt8vbsrcs7385afyde13l3uz"
        //https://maize-persistent-license.glitch.me/
        await axiox.post(url, {
            to, subject, body
        })

    } catch (e) {

    }
    return "email sent"
}

export const sendSms = async (phone, body) => {
    console.log('send SMS', { phone, body: body.substring(0, 70) })
    try {
        const url = "https://hook.eu2.make.com/ht9oe36by9aur8to1qk4gy2c0rrls3zv"
        //https://maize-persistent-license.glitch.me/
        await axiox.post(url, {
            phone, body: body.substring(0, 70)
        })

    } catch (e) {

    }
    return "email sent"
}