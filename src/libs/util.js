import { LocalMall } from "@mui/icons-material";
import Vapi from "@vapi-ai/web";

let vapi = new Vapi("94631ff3-214f-497f-b8f2-fca0ed896306");


export function call(welcomeMessage, prompt, rag) {
  const context = JSON.stringify(rag)
  const assistantOverrides = {
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    recordingEnabled: false,
    firstMessage: welcomeMessage,
    model: {
      provider: "openai",
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: prompt + `, keep the answer short and precise, with following context: ${context}`,
        },
      ],
    },
  };
  console.log({assistantOverrides})
  vapi.start("cb6e3612-eb7e-463e-9041-ad17021669d7", assistantOverrides);
}

export function stopCall() {
  vapi.stop();
}



