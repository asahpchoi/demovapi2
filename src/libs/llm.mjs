import "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { Groq } from "groq-sdk";
import axios from "axios";
import MistralClient from '@mistralai/mistralai';
import { func, tools } from "./func.mjs";
const endpoint = "https://ik-oai-eastus-2.openai.azure.com/";
const apiKey = "b3e819600fbe4981be34ef2aa79943e2"
const deployment = "gpt-4o";


export const checkSentiment = async (content) => {
    const systemPrompt = `
    you are a bot to analysis the conversation sentiment, provides
        grading out of 100 as *score, 
        what is doing good in the conversation as *donewell,
        what is not doing good in the conversation as *notdonewell,
        what should be improved next time as *nextime, 
        and what should be improvements as *improvement
        in *1 level JSON format
        Example:
            {
                improvement: "Consider starting the conversation with a friendly greeting, such as ”Good morning/afternoon, thank you for taking the time to meet with me today. I’m excited to discuss your insurance needs.”",
                nexttime: "Hi, thank you for coming in today. I’m looking forward to learning more about your insurance needs and how we can help you.",
                donewell: "well done statement",
                notdonewell: "not donewell",
                score: 78,
            }  `
    const messages = [
        {
            role: "system",
            content: systemPrompt
        }
        , {
            role: "user",
            content: content
        }]
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
    const reply = await client.getChatCompletions(deployment, messages);

    return reply.choices[0].message.content;
}

export const callLLM = async (systemPrompt, userPrompt, imageUrl, cb, history, rag, model, useTools) => {
    //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.

    const extraPrompt = "*answer the table in markdown format, when you sending a email, output the body as html, if you are sending sms, make sure prefix + is added, if print table, make sure it is in markdown format"
    const messages = [
        {
            role: "system",
            content: systemPrompt + `${extraPrompt} context: ${rag}`
        }]
        .concat(
            history ? history : [],
            [{
                role: "user",
                content: !imageUrl ?
                    [
                        {
                            type: "text",
                            text: userPrompt 
                        }
                    ] : [
                        {
                            type: "text",
                            text: userPrompt 
                        },
                        {
                            type: `image_url`,
                            imageUrl:
                                { url: imageUrl },
                        }
                    ],
            },
            ]);


    if (model === "azure" || !model)
        azureLLM(messages, cb, useTools);

    if (model === "groq")
        groqLLM(messages, cb);

    if (model === "minimax")
        minimaxLLM(systemPrompt ? systemPrompt + extraPrompt : "you are a bot" + extraPrompt, userPrompt, cb)

}


const azureLLM = async (messages, cb, useTools) => {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));

    if (!useTools) {
        const events = await client.streamChatCompletions(deployment,
            messages,
            { stream: true }
        );
        for await (const event of events) {
            for (const choice of event.choices) {
                cb(choice.delta?.content, choice.finishReason);
            }
        }
    }
    else {
        const reply = await client.getChatCompletions(
            deployment,
            messages,
            {
                tools,

            }
        )
        const choice = reply.choices[0];
        if (choice.finishReason === 'tool_calls') {
            if (choice.message.toolCalls.length === 1) {
                const tool = choice.message.toolCalls[0];
                const requestedToolCalls = await func[tool.function.name](tool.function.arguments, tool.id);
                const replyMessage = reply.choices[0].message;


                const toolCallResolutionMessages = [
                    ...messages,
                    replyMessage,
                    requestedToolCalls,
                ];

                console.log({ messages, replyMessage, requestedToolCalls })
                const result = await client.getChatCompletions(deployment, toolCallResolutionMessages);
                try {
                    cb(result.choices[0].message.content, "stop", requestedToolCalls)
                }
                catch (e) {

                }
            }
            else {
                cb("sorry, this function is not possible right now", "stop")
            }
        }
        else {
            cb(choice.message.content, "stop")
        }
    }
    return "OK"
}
const minimaxLLM = async (systemPrompt, userPrompt, cb) => {
    //const groupID = '1743503684043542894';
    const api_key = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJhc2FjaG9pIiwiVXNlck5hbWUiOiJhc2FjaG9pIiwiQWNjb3VudCI6IiIsIlN1YmplY3RJRCI6IjE3NDM1MDM2ODQwNTE5MzE1MDIiLCJQaG9uZSI6IjE3MTUyMTY2NzI5IiwiR3JvdXBJRCI6IjE3NDM1MDM2ODQwNDM1NDI4OTQiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiJhc2EuY2hvaUBnbWFpbC5jb20iLCJDcmVhdGVUaW1lIjoiMjAyNC0wNS0zMCAyMjo1MToyMyIsImlzcyI6Im1pbmltYXgifQ.otWX76fs0v2k30vFp_xVp_0DnIbUpbuoUCrW1XLr75UHPA7ufsXKeywKYyu7WUUw6dSSFy72GpjpgfvN91xlxNyZZudKWwHRX6G3AW3jYRRg3FYQepoGoJmHFxf0tPUpeQGdIb-JXOCCRSdcMUJvRCs24SNUgqmgn9xf9OKBTnMbK80Z0BL4lRhLC90yhzbQsdQ4CEIL9q0gS-Jn7gjsmgQk6KSv9bRnbAZVMMu6WJMOXeV3hBE0E83BY3AvFHtleXpv-DXjSE24KfTL_AAJuElLlE6JgUyvvPrHmoM7PUqEynS8obmMxpf7Mn84ML6rCkinMdHdcCX81xDN-74W-A'
    const url = "https://api.minimax.chat/v1/text/chatcompletion_v2"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${api_key}` }
    const messages = [
        {
            role: "system",
            content: systemPrompt
        }, {
            role: "user",
            content: userPrompt
        }];

    const data = {
        "model": "abab6.5s-chat",
        messages: messages,
        "tools": [],
        "tool_choice": "none",
        "stream": false,
        "max_tokens": 2048,
        "temperature": 0.1,
        "top_p": 0.9
    }


    const reply = axios.post(url, data, { headers });

    reply.then(d => {

        const content = d.data.base_resp.status_msg != "" ? d.data.base_resp.status_msg : d.data.choices[0].message.content;
        cb(content, "stop")
    })


}
/*
const mistralLLM = async (messages, cb) => {

    const client = new MistralClient('QLrfXO2hbUYXoUtSqDXm0bGiwcOiSQmd');

    const chatStreamResponse = await client.chatStream({
        model: 'mistral-tiny',
        messages: messages,
    });


    for await (const chunk of chatStreamResponse) {
        if (chunk.choices[0].delta.content !== undefined) {
            const streamText = chunk.choices[0].delta.content;
            cb(streamText);
        }
    }
}*/
const groqLLM = async (messages, cb) => {
    const groq = new Groq({
        apiKey: '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'
        , dangerouslyAllowBrowser: true
    });

    const m = messages.map(m => {
        let c2 = "";

        if (typeof m.content === "object") {
            c2 = m.content[0].text
        }
        else {
            c2 = m.content
        }

        return {
            role: m.role,
            content: c2
        }
    })

    const stream = await getGroqChatStream();
    for await (const chunk of stream) {
        // Print the completion returned by the LLM.
        cb(chunk.choices[0]?.delta?.content || "", chunk.choices[0]?.finish_reason);

    }


    async function getGroqChatStream() {
        return groq.chat.completions.create({
            messages: m,
            model: "llama3-70b-8192",
            stream: true,
        });
    }
}

