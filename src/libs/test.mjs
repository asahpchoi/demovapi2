//import {callLLM} from "./llm.mjs"

//callLLM = async (systemPrompt, userPrompt, imageUrl, cb, history, rag, model)

/*
callLLM("you are a bot", "send a mail to asa.choi@gmail.com to say hello",null, (data, status) => {
    console.log(data)
}, [], "", "azure", true);
*/
import {sendEmail} from "./email.mjs";

sendEmail("asa.choi@gmail.com", "Testing", "Hello Wolrd")