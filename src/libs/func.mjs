import emailjs from "@emailjs/browser";

export const func = {
    send_email: (args, id) => {
        const params = JSON.parse(args)
        emailjs.init("BUjeSh0QyqvF5oqDQ");


        var templateParams = {
            to: params.to,
            subject: params.subject,
            body: params.body,
        };

        console.log({
            templateParams
        })

        emailjs.send('service_xu22a3h', 'template_qksoc5s', templateParams).then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
                console.log('FAILED...', error);
            },
        );

        return {
            role: "tool",
            content: `Email send to ${params['to']} with body: ${params['body']}`,
            toolCallId: id,
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
