import "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import axios from "axios";

const endpoint = "https://ik-oai-eastus-2.openai.azure.com/";
const apiKey = "b3e819600fbe4981be34ef2aa79943e2"
const deployment = "gpt-4o";

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

export const callLLM = async (systemPrompt, userPrompt, imageUrl, cb, history, rag, LLMmodel) => {
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

    !LLMmodel ?
        azureLLM(messages, cb) :
        minimaxLLM([
            {
                role: "system",
                content: systemPrompt + `context: ${rag}`
            },
            { role: "user", content: userPrompt }
        ], cb);
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
const minimaxLLM = async (messages, cb) => {
    const groupID = '1743503684043542894';
    const api_key = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJhc2FjaG9pIiwiVXNlck5hbWUiOiJhc2FjaG9pIiwiQWNjb3VudCI6IiIsIlN1YmplY3RJRCI6IjE3NDM1MDM2ODQwNTE5MzE1MDIiLCJQaG9uZSI6IjE3MTUyMTY2NzI5IiwiR3JvdXBJRCI6IjE3NDM1MDM2ODQwNDM1NDI4OTQiLCJQYWdlTmFtZSI6IiIsIk1haWwiOiJhc2EuY2hvaUBnbWFpbC5jb20iLCJDcmVhdGVUaW1lIjoiMjAyNC0wNS0zMCAyMjo1MToyMyIsImlzcyI6Im1pbmltYXgifQ.otWX76fs0v2k30vFp_xVp_0DnIbUpbuoUCrW1XLr75UHPA7ufsXKeywKYyu7WUUw6dSSFy72GpjpgfvN91xlxNyZZudKWwHRX6G3AW3jYRRg3FYQepoGoJmHFxf0tPUpeQGdIb-JXOCCRSdcMUJvRCs24SNUgqmgn9xf9OKBTnMbK80Z0BL4lRhLC90yhzbQsdQ4CEIL9q0gS-Jn7gjsmgQk6KSv9bRnbAZVMMu6WJMOXeV3hBE0E83BY3AvFHtleXpv-DXjSE24KfTL_AAJuElLlE6JgUyvvPrHmoM7PUqEynS8obmMxpf7Mn84ML6rCkinMdHdcCX81xDN-74W-A'
    const url = "https://api.minimax.chat/v1/text/chatcompletion_v2"
    const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${api_key}` }

    
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
    console.log({ m })
    const data = {
        "model": "abab6.5s-chat",
        messages: m,
        "tools": [],
        "tool_choice": "none",
        "stream": false,
        "max_tokens": 2048,
        "temperature": 0.1,
        "top_p": 0.9
    }

    console.log("Calling minimax")

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

function main() {
    /*
    callLLM("you are an AI bot", "how are you?", null, (data) => {
        console.log({ data })
    }, [], null);*/
    callLLM("you are an AI bot", "how are you?", null, (data) => {
        console.log({ data })
    }, [], null, "minimax");
}

main();