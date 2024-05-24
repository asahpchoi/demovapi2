import "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

const callLLM = async (question) => {
    const endpoint = "https://ik-oai-eastus-2.openai.azure.com/";
    const apiKey = "b3e819600fbe4981be34ef2aa79943e2"
    const deployment = "gpt-4o"; //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.
    const messages = [
        {
            role: "system",
            content: "You are a helpful assistant.",
        },
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: "create 4 system prompts for 1. claim assistant, 2. finanical advisor, 3. health advisor, 4. project manager in json format.",
                },
            ],
        },
    ];


    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
    const output = await client.getChatCompletions(deployment, messages);
    console.log(output.choices[0].message)

    return "answer"
}

console.log(callLLM("where is hong kong?"))