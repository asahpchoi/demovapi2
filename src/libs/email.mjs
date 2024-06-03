export const sendEmail = async (to, subject, body) => {
    console.log('sendmail', { to, subject, body })
    try {
        const url="https://hook.eu2.make.com/ncqyrjl3kt8vbsrcs7385afyde13l3uz"
        //https://maize-persistent-license.glitch.me/
        await fetch(`${url}?to=${to}&subject=${subject}&body=${body}`);

    } catch (e) {

    }
    return "email sent"
}