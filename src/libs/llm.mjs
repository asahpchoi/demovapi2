import "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { Groq } from "groq-sdk";
import axios from "axios";
import MistralClient from '@mistralai/mistralai';
import { func, tools } from "./func.mjs";
import { keys } from "../key.js"
 


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
    const client = new OpenAIClient(keys.azure.endpoint, new AzureKeyCredential(keys.azure.apiKey));
    const reply = await client.getChatCompletions(keys.azure.deployment, messages);

    return reply.choices[0].message.content;
}

export const callLLM = async (systemPrompt, userPrompt, imageUrl, cb, history, rag, model, useTools) => {
    //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.

    const extraPrompt = ", output as markdown"
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
    const client = new OpenAIClient(keys.azure.endpoint, new AzureKeyCredential(keys.azure.apiKey));

    if (!useTools) {
        const events = await client.streamChatCompletions(keys.azure.deployment,
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
            keys.azure.deployment,
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
                const result = await client.getChatCompletions(keys.azure.deployment, toolCallResolutionMessages);
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
  const headers = { "Content-Type": "application/json", "Authorization": `Bearer ${keys.minimax.api_key}` }
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
        "messages": messages,
        "tools": [],
        "tool_choice": "none",
        "stream": false,
        "max_tokens": 2048,
        "temperature": 0.1,
        "top_p": 0.9
    }


    const reply = axios.post(keys.minimax.url, data, { headers });

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
        apiKey: keys.groq.apiKey
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

