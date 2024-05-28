import {

    Button,
    Fab,
    Stack,
    TextField,

    Typography,

} from "@mui/material";
import {

    Stop as StopIcon,

} from '@mui/icons-material';
import Markdown from 'react-markdown';

export const TextUI = ({ args }) => {

    const { setUserPrompt, setAnswer, callLLM, prompt, userPrompt, image, history, setHistory, setIsTexting, setImage, answer } = args
    return <div className="fullscreen">
        <Stack justifyContent="center" style={{ padding: "10px" }}>
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
            <input type="file" accept="image/*" capture="environment" onChange={async (evt) => {
                const convertBase64 = (file) => {
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
                const file = evt.target.files[0];
                const base64 = await convertBase64(file);
                setImage(base64);
            }} />

            <Typography style={{ width: '100vw', height: '50vh', overflow: 'scroll' }}>Answer:
                <Markdown>{

                    answer}</Markdown></Typography>

            <img style={{ width: '10vh' }} src={image} />

            <Stack direction="row" justifyContent="center">

                <Fab onClick={() => setIsTexting(false)}><StopIcon /></Fab>
            </Stack>
        </Stack>
    </div>
}