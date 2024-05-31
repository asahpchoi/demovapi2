import * as hub from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

// pull a chat prompt

export const getPrompt = async (promptname) => {
    const prompt = await hub.pull(promptname);

    return prompt.template;
} 