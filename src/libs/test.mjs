import {callLLM} from "./llm.mjs"

//callLLM = async (systemPrompt, userPrompt, imageUrl, cb, history, rag, model)
const tools = [
    {
      type: "function",
      function: {
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The city and state, e.g. San Francisco, CA",
            },
            unit: { type: "string", enum: ["celsius", "fahrenheit"] },
          },
          required: ["location"],
        },
      },
    },
  ];

callLLM("you are a bot", "what is current weather in Hong Kong?", null, (data, status) => {
    console.log(data)
}, [], "", "azure", tools,false );
