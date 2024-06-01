import {
    Stack,
    TextField,
    Button,
    Paper,
} from "@mui/material";
import { useState } from "react";
import Markdown from 'react-markdown';
import { ImageControl } from "./ImageControl";



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

    return <Stack className="halfpage z1">
        <Stack direction="row"
        >
            <div style={{ width: image ? '70%' : '100%', height: '50vh', overflow: 'auto', textAlign: "left" }}>
                <Stack>
                    {history.map(h => {

                        const data = h.content[0].text
                        return <div>{h.role}<Markdown>{data}</Markdown></div>
                    })}
                    <Markdown>{answer}</Markdown>
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
            className="chattextbox"
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
                                        ]

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