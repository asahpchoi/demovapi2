export const func = {
    get_current_weather: (args, id) => {
        const params = JSON.parse(args)
        //return params["location"] 
        const unit = 49;
        //return 56
        return {
            role: "tool",
            content: `The weather in ${params['location']} is 72 degrees ${unit} and sunny.`,
            toolCallId: id,
        }
    },
    send_email: (args, id) => {
        const params = JSON.parse(args)
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
            name: "get_current_weather",
            description: "Get the current weather in a given location",
            parameters: {
                type: "object",
                properties: {
                    location: {
                        type: "string",
                        description: "The city and state, e.g. San Francisco, CA",
                    },
                    unit: { type: "string", enum: ["celsius", "fahrenheit"] },
                },
                required: ["location"],
            },
        },
    },
    {

        type: "function",
        function: {
            name: "send_email",
            description: "send an email",
            parameters: {
                type: "object",
                properties: {
                    to: {
                        type: "string",
                        description: "email receipient",
                    },
                    body: {
                        type: "string",
                        description: "email body",
                    },
                },
                required: ["to", "body"],
            },
        },
    },
];
