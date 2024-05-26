import "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { AssistantsClient } from "@azure/openai-assistants";


const endpoint = "https://ik-oai-eastus-2.openai.azure.com/";
const apiKey = "b3e819600fbe4981be34ef2aa79943e2"
const deployment = "gpt-4o";

export const callLLM = async (systemPrompt, userPrompt) => {
    //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.
    const messages = [
        {
            role: "system",
            content: systemPrompt
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

export const callAssistant = async (cb) => {

    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));
    const assistant = await assistantsClient.createAssistant({
        model: deployment,
        name: "JS Math Tutor",
        instructions: "You are a personal math tutor. Write and run code to answer math questions.",
        tools: [{ type: "code_interpreter" }]
    });
    const assistantThread = await assistantsClient.createThread();
    const question = "I need to solve the equation '3x + 11 = 14'. Can you help me?, please help to create a image to show it";

    await assistantsClient.createMessage(assistantThread.id, "user", question);

    let runResponse = await assistantsClient.createRun(assistantThread.id, {
        assistantId: assistant.id,
        instructions: "Please address the user as Jane Doe. The user has a premium account."

    });

    cb(null, "Agent Created");
    do {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        runResponse = await assistantsClient.getRun(assistantThread.id, runResponse.id);
        cb(null, "Agent Running", runResponse)
    } while (runResponse.status === "queued" || runResponse.status === "in_progress")

    const runMessages = await assistantsClient.listMessages(assistantThread.id);
    for (const runMessageDatum of runMessages.data) {
        for (const item of runMessageDatum.content) {
            if (item.type === "text") {
                cb(null, "text returned", item.text);
            } else if (item.type === "image_file") {
                cb(null, "image created", item);
                const imageId = item.imageFile.file_id
                console.log({ imageId })
                const file = await assistantsClient.getFile(imageId);
                console.log({ file });
            }
        }
    }
    await assistantsClient.deleteAssistant(assistant.id);

}

async function main() {

    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));
    const ast = await assistantsClient.listAssistants()

    ast.data.forEach(async (a) => {
        console.log(a.id)
        //const a2 = await assistantsClient.getAssistant(a.id);
        await assistantsClient.deleteAssistant(a.id)
    })

    await callAssistant((error, data, obj) => {
        console.log({ data })
    });
}

//main();