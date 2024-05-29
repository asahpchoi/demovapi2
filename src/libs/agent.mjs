import { AssistantsClient, AzureKeyCredential } from "@azure/openai-assistants";

const endpoint = "https://ik-oai-eastus-2.openai.azure.com/";
const apiKey = "b3e819600fbe4981be34ef2aa79943e2"
const deployment = "gpt-4o";

export const createAssistant = async ({ name, prompt }) => {
    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));
    const assistant = await assistantsClient.createAssistant({
        model: deployment,
        name: name,
        instructions: prompt,
        tools: [{ type: "code_interpreter" }]
    });
    return assistant.id;
}

export const listAssistants = async (setAssistants) => {
    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));

    const assistants = (await assistantsClient.listAssistants()).data.map(d => {
        return {
            id: d.id, name: d.name, instructions: d.instructions
        }
    });

    setAssistants(assistants)

}

export const removeAssisant = async (id) => {
    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));
    assistantsClient.deleteAssistant(id)
}

export const updateAssistant = async (id, name, prompt) => {
    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));
    console.log({ id, name, prompt })
    assistantsClient.updateAssistant(id, {
        model: deployment,
        name: name,
        instructions: prompt,
        tools: [{ type: "code_interpreter" }]
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

export const callAssistant = async (assistantId, question, username, cb) => {
    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));
    const assistant = await assistantsClient.getAssistant(assistantId);
    const assistantThread = await assistantsClient.createThread();

    // await assistantsClient.createAssistantFile(assistantId, fileId);
    await assistantsClient.createMessage(assistantThread.id, "user", question);

    let runResponse = await assistantsClient.createRun(assistantThread.id, {
        assistantId: assistant.id,
        instructions: `Please address the user as ${username}.`
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

async function main() {
    console.log("Start")
    const id = await createAssistant({ name: 'financial planner', prompt: 'you are a bot' })
    await updateAssistant({ id, name: 'financial planner 2', prompt: 'you are a bot 2' })
    //const asst = await listAssistants()
    //console.log({ data: asst })
    //console.log({a,f});
    //a.data.forEach(a1 => console.log(a1));
    // await housekeep();
    /*

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
    */

}



const uploadFile = async (filePath) => {

    /*const fileStream = fs.createReadStream(filePath);

    const assistantsClient = new AssistantsClient(endpoint, new AzureKeyCredential(apiKey));

    const uploadAssistantFile = await assistantsClient.uploadFile(fileStream, "assistants", { filename: "2023 result" });
    return uploadAssistantFile.id
*/
}
