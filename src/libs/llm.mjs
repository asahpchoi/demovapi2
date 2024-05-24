import "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

export const callLLM = async (systemPrompt, userPrompt) => {
    const endpoint = "https://ik-oai-eastus-2.openai.azure.com/";
    const apiKey = "b3e819600fbe4981be34ef2aa79943e2"
    const deployment = "gpt-4o"; //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.
    const messages = [
        {
            role: "system",
            content:  systemPrompt
        },
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: userPrompt
                },
            ],
        },
    ];


    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
    const output = await client.getChatCompletions(deployment, messages);
    
    return output.choices[0].message.content;
}

const r = await callLLM("where is hong kong?")
console.log(r)