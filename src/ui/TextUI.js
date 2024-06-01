import {
    Stack,
    TextField,
    Button,
    Paper,
} from "@mui/material";
import { useState } from "react";
import Markdown from 'react-markdown';
import { ImageControl } from "./ImageControl";
import { LLMIcon } from "./LLMIcon"
import PersonIcon from '@mui/icons-material/Person';

export const TextUI = ({ args }) => {
    const { setUserPrompt, setAnswer, callLLM, prompt, userPrompt, image, setImage, history, setHistory, answer, rag, setDisplayMode, model } = args

    function buildMessages() {

    }

    function convertMessages(ms) {
        return ms.map(
            m => {
                return {
                    role: m.role,
                    content: m.content[0].text
                }
            }
        )
    }

    return <Stack className="halfpage">

        <Stack className="z1 flex mb-5" direction="row">
            <div style={{ width: image ? '70%' : '100%', height: '65vh', overflow: 'auto', textAlign: "left" }}>

                <Stack className="p-2">
                    {history.map(h => {
                        const data = h.content[0].text
                        return <Stack direction="row" className="pt-2">
                            {h.model ? <LLMIcon name={h.model} /> : <PersonIcon className="h-10 w-10" />}
                            <Markdown className="pl-2">{data}</Markdown>
                        </Stack>
                    })}
                    {answer && <Stack direction="row" className="pt-2">
                        <LLMIcon name={model} ></LLMIcon>
                        <Markdown className="pl-2">{answer}</Markdown>
                    </Stack>}

                </Stack>

            </div>
            {image && <div>
                <ImageControl image={image} setImage={setImage} />
            </div>}

        </Stack>
        <TextField
            label="Ask a question"
            fullWidth
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            className="z1"
            onKeyDown={async (e) => {
                if (e.keyCode === 13) {
                    var answerPart = '';
                    history.push(
                        {
                            role: "user",
                            content:
                                [
                                    {
                                        type: "text",
                                        text: userPrompt
                                    }
                                ]
                        })
                    setUserPrompt("");
                    setAnswer(".....")

                    const answer = await callLLM(prompt, userPrompt, image,
                        (data, fin) => {
                            if (data) {

                                answerPart += data;
                                setAnswer(answerPart)
                            }
                            if (fin) {

                                history.push({
                                    role: "assistant",
                                    content:
                                        [
                                            {
                                                type: "text",
                                                text: answerPart
                                            }
                                        ],
                                    model: model

                                })
                                setHistory([...history]);
                                setAnswer("");
                            }

                        }, history, rag, model);
                    const newHistory = history;


                }
            }}
        />
    </Stack>
}