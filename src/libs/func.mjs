
import { sendEmail } from "./email.mjs";

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
];
