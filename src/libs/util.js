
import Vapi from "@vapi-ai/web";

let vapi = new Vapi("94631ff3-214f-497f-b8f2-fca0ed896306");
let callback = null;

vapi.on("message", (message) => {
  callback(message);
});

export const setCallback = (cb) => {
  callback = cb;
}

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}

export function resizeBase64Img(base64) {
  const newWidth = 400;
  const newHeight = 600;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    let context = canvas.getContext("2d");
    let img = document.createElement("img");
    img.src = base64;
    img.onload = function () {
      context.scale(newWidth / img.width, newHeight / img.height);
      context.drawImage(img, 0, 0);
      resolve(canvas.toDataURL());
    }
  });
}

export function call(username, prompt, rag) {
  const context = JSON.stringify(rag)

  const assistantOverrides = {
    transcriber: {
      provider: "deepgram",
      model: "nova-2",
      language: "en-US",
    },
    recordingEnabled: false,
    firstMessage: `Hello ${username}, What I can help you today?`,
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
  console.log({ assistantOverrides })
  vapi.start("cb6e3612-eb7e-463e-9041-ad17021669d7", assistantOverrides);
}

export function setMute(mute) {
  vapi.setMuted(mute);
}

export function isMute() {
  return vapi.isMuted();
}

export function stopCall() {
  vapi.stop();
}



