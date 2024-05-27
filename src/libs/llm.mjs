import "axios";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { AssistantsClient } from "@azure/openai-assistants";
import { Stream } from "@mui/icons-material";
//import * as fs from "fs";

const endpoint = "https://ik-oai-eastus-2.openai.azure.com/";
const apiKey = "b3e819600fbe4981be34ef2aa79943e2"
const deployment = "gpt-4o";

export const callLLM = async (systemPrompt, userPrompt, imageUrl, cb, history) => {
    //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.



    const messages = [
        {
            role: "system",
            content: systemPrompt
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

export const createAssistant = async (cb) => {
    const prompt = `Act as a financial analyst by accessing financial data, write and run code to answer the questions. 
    Your capabilities include analyzing key metrics, comprehensive financial statements, 
    vital financial ratios, and tracking financial growth trends, also you need to step by step to come up with the answer`;

    const name = 'financial analyst'

    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));
    const assistant = await assistantsClient.createAssistant({
        model: deployment,
        name: name,
        instructions: prompt,
        tools: [{ type: "code_interpreter" }]
    });
    return assistant.id;
}



const uploadFile = async (filePath) => {

    /*const fileStream = fs.createReadStream(filePath);

    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));

    const uploadAssistantFile = await assistantsClient.uploadFile(fileStream, "assistants", { filename: "2023 result" });
    return uploadAssistantFile.id
*/
}




export const callAssistant = async (assistantId, fileId, cb) => {

    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));

    const assistant = await assistantsClient.getAssistant(assistantId);

    const assistantThread = await assistantsClient.createThread();
    const question = "create a flow chart for claim process";

    // await assistantsClient.createAssistantFile(assistantId, fileId);
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
    //await assistantsClient.deleteAssistant(assistant.id);

}

async function testLLM() {
    await callLLM(
        "you are a bot",
        "what is in the image?",
        "https://dotblogsfile.blob.core.windows.net/user/anyun/fb2960c4-6f84-435b-a6d7-b82ccb2e1c72/1710599879.png.png",
        data => {
            console.log({ data })
        }
    )

}
async function main() {

    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));
    const id = await createAssistant()
    console.log({ id })

    //const id = 'asst_9HCRQavlIoAfbaSjNR0Dli5r';
    const report_id = await uploadFile('./src/docs/NVDA.csv');
    console.log({ report_id })
    //const report_id = 'assistant-H4VNZ1NolfRwri4pfmr63PF0';  


    callAssistant(id, report_id, (error, data, obj) => {
        console.log({
            error, data, obj, detail: obj?.value?.annotations
        })
    })

}

async function housekeep() {

    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));
    const a = await assistantsClient.listAssistants();
    const f = await assistantsClient.listFiles();

    a.data.forEach(async ai => {
        console.log(ai.id)
        await assistantsClient.deleteAssistant(ai.id)
    })
    f.data.forEach(async ai => {
        console.log(ai)
        await assistantsClient.deleteFile(ai.id)
    })


}
 