export const sendEmail = async (to, subject, body) => {
    console.log('sendmail', { to, subject, body })
    try {
        await fetch(`https://maize-persistent-license.glitch.me/?to=${to}&subject=${subject}&body=${body}`);
    } catch (e) {

    }
    return "email sent"
}