
import { sendEmail, sendSms } from "./email.mjs";

//sendEmail("asa.choi@gmail.com", "Testing", "Hello Wolrd")

export const func = {
    send_email: async (args, id) => {
        const params = JSON.parse(args)
        try {
            await sendEmail(params.to, params.subject, params.body);
            return {
                role: "tool",
                content: `Email sent to ${params.to}`,
                toolCallId: id,
            }
        }
        catch (e) {
            return {
                role: "tool",
                content: `Email cant be sent`,
                toolCallId: id,
            }
        }
    },
    send_sms: async (args, id) => {
        const params = JSON.parse(args)
        try {
            await sendSms(params.phone, params.body);
            return {
                role: "tool",
                content: `sms sent to ${params.phone}`,
                toolCallId: id,
            }
        }
        catch (e) {
            return {
                role: "tool",
                content: `sms cant be sent`,
                toolCallId: id,
            }
        }
    }
}

export const tools = [
    {

        type: "function",
        function: {
            name: "send_email",
            description: "send an email, generate subject based on the body",
            parameters: {
                type: "object",
                properties: {
                    to: {
                        type: "string",
                        description: "email receipient",
                    },
                    subject: {
                        type: "string",
                        description: "email subject",
                    },
                    body: {
                        type: "string",
                        description: "email body",
                    },
                },
                required: ["to", "body", "subject"],
            },
        },
    },
    {

        type: "function",
        function: {
            name: "send_sms",
            description: "send a sms",
            parameters: {
                type: "object",
                properties: {
                    phone: {
                        type: "string",
                        description: "phone number",
                    },
                    body: {
                        type: "string",
                        description: "phone body",
                    },
                },
                required: ["phone", "body"],
            },
        },
    },
];
