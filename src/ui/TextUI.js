import {
    Stack,
    TextField,
    Button,
    Paper,
    Checkbox
} from "@mui/material";
import { useState } from "react";
import Markdown from 'react-markdown';
import { ImageControl } from "./ImageControl";
import { LLMIcon } from "./LLMIcon"
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

export const TextUI = ({ args }) => {
    const { setUserPrompt, setAnswer, callLLM,
        prompt, userPrompt, image, setImage,
        history, setHistory, answer, rag,
        setDisplayMode, model, openImageCapture } = args

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
        {icon:             <Checkbox onClick={() => {
            setUseTool(!useTool);
        }}></Checkbox>, name: 'use Tool'}
    ];

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
                    console.log({toolCalls})
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

    return <Stack className="halfpage">
        <Stack className="z1 flex mb-5" direction="row">
            <div id="chatbox" style={{ width: image ? '70%' : '100%', height: '50vh', overflow: 'auto', textAlign: "left" }}>
                <Stack className="p-2">
                    {history.map(h => {
                        const data = h.content[0].text
                        return <Stack direction="row" className="pt-2">
                            {h.model ? <LLMIcon name={h.model} /> : <LLMIcon name="user" />}
                            <Markdown className="pl-2 pt-2">{data}</Markdown>
                        </Stack>
                    })}
                    {answer && <Stack direction="row" className="pt-2">
                        <LLMIcon name={model} ></LLMIcon>
                        <Markdown className="pl-2 pt-2">{answer}</Markdown>
                    </Stack>}
                    {isLoading && <CircularProgress />}
                </Stack>
            </div>
            {image && <div>
                <ImageControl image={image} setImage={setImage} />
            </div>}

        </Stack>
        <Stack direction="row" className="p-3">
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