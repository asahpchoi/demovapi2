import "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

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

export const callLLM = async (systemPrompt, userPrompt, imageUrl, cb, history, rag) => {
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

    //console.log({ messages })

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
    const events = await client.streamChatCompletions(deployment, messages, { stream: true });

    for await (const event of events) {
        for (const choice of event.choices) {
            cb(choice.delta?.content);
        }
    }
    return "OK"
    //return output.choices[0].message.content;
}
