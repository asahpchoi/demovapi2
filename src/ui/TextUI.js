import {
    Stack,
    TextField,
} from "@mui/material";
import { useState } from "react";
import Markdown from 'react-markdown';
import { ImageControl } from "./ImageControl";

export const TextUI = ({ args }) => {

    const { setUserPrompt, setAnswer, callLLM, prompt, userPrompt, image, setImage, history, setHistory, answer } = args


    return <Stack >
        <h3>Test the bot</h3>
        <TextField
            label="Ask a question"
            fullWidth
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={async (e) => {
                if (e.keyCode === 13) {
                    var answerPart = '';
                    setUserPrompt("");
                    setAnswer(".....")
                    const answer = await callLLM(prompt, userPrompt, image,
                        data => {
                            if (data) {
                                answerPart += data;
                                setAnswer(answerPart)
                            }
                        }, history);
                    const newHistory = history;
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
                    //console.log(history)
                }
            }}
        />
        <Stack direction="row"
        >
            <div style={{ width: image ? '70%' : '100%', height: '50vh', overflow: 'auto', textAlign: "left" }}>
                <Markdown  >{answer}</Markdown>
            </div>
            { image && <div>
                <ImageControl image={image} setImage={setImage} />
            </div>}

        </Stack> 
    </Stack>
}