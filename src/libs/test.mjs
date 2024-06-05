import { callLLM } from "./llm.mjs";

const d = await callLLM("you are a bot", "what is top 10 univerity in hong kong", null, (data => {console.log(data)}), [], "", "minimax", false)