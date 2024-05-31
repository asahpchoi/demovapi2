import "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import axios from "axios";
import MistralClient from '@mistralai/mistralai';
const endpoint = "https://ik-oai-eastus-2.openai.azure.com/";
const apiKey = "b3e819600fbe4981be34ef2aa79943e2"
const deployment = "gpt-4o";
import { Groq } from "groq-sdk";

export const checkSentiment = async (content) => {
    const systemPrompt = `you are a bot to analysis the conversation sentiment, and provide a feedback what is the customer feedback
                         you can reply in markdown, with setimention option of Positive, Neutral, Positive, Sad, Angry
                         example output: 
                            ##Overall sentitement: *Positive*
                            ##Summary: the conversation is about a product enquiry
                            ##Suggestion: the conversation can be shorten and more precise to address the questions
                            ##Overall Scoring: *8* 
                         `
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

export const callLLM = async (systemPrompt, userPrompt, imageUrl, cb, history, rag, model) => {
    //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.
    const messages = [
        {
            role: "system",
            content: systemPrompt + `context: ${rag}`
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



    if (model == "azure" || !model)
        azureLLM(messages, cb);

    if (model == "groq")
        groqLLM(messages, cb);

    if (model == "minimax")
        minimaxLLM(systemPrompt ? systemPrompt : "you are a bot", userPrompt, cb)

}


const azureLLM = async (messages, cb) => {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
    const events = await client.streamChatCompletions(deployment, messages, { stream: true });

    for await (const event of events) {
        for (const choice of event.choices) {
            cb(choice.delta?.content);
        }
    }
    return "OK"

}
const minimaxLLM = async (systemPrompt, userPrompt, cb) => {
    const groupID = '1743503684043542894';
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

    console.log("Calling minimax", data)

    const reply = axios.post(url, data, { headers });
    reply.then(d => {
        const content = d.data.choices[0].message.content;
        cb(content)
        /*
        console.log({d: d.data})
       
        d.data.on('data', data => {
             
           
            const chunk = JSON.parse(data.toString().replace('data: ', ''));
            
            const choice = chunk.choices[0];
            if (choice.delta) {
                cb(choice.delta.content);
            }
           
            //console.log({c: choice.delta?choice.delta.content:choice.message.content})
        })
        */
    })


}
const mistralLLM = async (messages, cb) => {

    const client = new MistralClient('QLrfXO2hbUYXoUtSqDXm0bGiwcOiSQmd');

    const chatStreamResponse = await client.chatStream({
        model: 'mistral-tiny',
        messages: messages,
    });

    console.log('Chat Stream:');
    for await (const chunk of chatStreamResponse) {
        if (chunk.choices[0].delta.content !== undefined) {
            const streamText = chunk.choices[0].delta.content;
            cb(streamText);
        }
    }
}

const groqLLM = async (messages, cb) => {
    const groq = new Groq({
        apiKey: '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'
        , dangerouslyAllowBrowser: true
    });

    const m = messages.map(m => {
        let c2 = "";

        if (typeof m.content == "object") {
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
        cb(chunk.choices[0]?.delta?.content || "");
    }


    async function getGroqChatStream() {
        return groq.chat.completions.create({
            messages: m,
            model: "llama3-70b-8192",
            stream: true,
        });
    }
}

