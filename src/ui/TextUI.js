import {
    Stack,
    TextField,
    Button,
    Paper,
    Checkbox
} from "@mui/material";
import { useState } from "react";
import { ImageControl } from "./ImageControl";
import { LLMIcon } from "./LLMIcon"
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MoodIcon from '@mui/icons-material/Mood';
import { checkSentiment } from "../libs/llm.mjs";
import { Chatbot } from "./Chatbot";

export const TextUI = ({ args }) => {
    const { setUserPrompt, setAnswer, callLLM,
        prompt, userPrompt, image, setImage,
        history, setHistory, answer, rag,
        setDisplayMode, model, openImageCapture, setResult } = args

    const [useTool, setUseTool] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const actions = [
        { icon: <CameraAltIcon onClick={openImageCapture} />, name: 'Take photo' },
        {
            icon: <QrCodeScannerIcon onClick={() => {
                setDisplayMode("QR");
            }

            } />, name: 'Use mobile to take photo'
        },
        {
            icon: <Checkbox onClick={() => {
                setUseTool(!useTool);
            }}></Checkbox>, name: 'use Tool'
        },
        {
            icon: <MoodIcon onClick={showRating}>
            </MoodIcon>, name: 'rating'
        }
    ];

    async function showRating() {
        const data = history.map(h => `${h.role}: ${h.content}`).join();

        const scoring = await checkSentiment(data);
        setDisplayMode("result")

        setResult(scoring)
        //setSentiment(sentimentReply)
    }

    async function handleSubmit() {
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
        setAnswer("")
        setIsLoading(true);
        const chatbox = document.getElementById("chatbox");
        chatbox.scrollTop = 10000;

        const answer = await callLLM(prompt, userPrompt, image,
            (data, fin, toolCalls) => {
                if (data) {
                    setIsLoading(false)
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
                    console.log({ toolCalls })
                    setHistory([...history]);
                    setAnswer("");
                }
                const chatbox = document.getElementById("chatbox");
                chatbox.scrollTop = 10000;

            }, history, rag, model, useTool);
        const newHistory = history;
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

    return <Stack className="bg-fwd-100 ">
        <Stack className="z1 flex  bg-fwd-100" direction="row" justifyContent="space-between"
            alignItems="baseline">
            <Chatbot LLMIcon={LLMIcon} history={history} answer={answer} model={model} isLoading={isLoading} />
            {image && <div>
                <ImageControl image={image} setImage={setImage} />
            </div>}
        </Stack>
        <Stack direction="row" className="p-3"  >
            <TextField
                label="Ask a question"
                fullWidth
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="z1"
                onKeyDown={async (e) => {
                    if (e.keyCode === 13) {
                        handleSubmit();
                    }
                }}
            />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </Stack>

    </Stack>
}