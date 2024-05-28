import {
    Fab,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {

    Stop as StopIcon,

} from '@mui/icons-material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Markdown from 'react-markdown';

export const TextUI = ({ args }) => {

    const { setUserPrompt, setAnswer, callLLM, prompt, userPrompt, image, history, setHistory, setIsTexting, setImage, answer } = args
    return <div className="fullscreen">
        <Stack justifyContent="center" className="overlay">
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
            <input type="file" id="imageCapture" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={async (evt) => {
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
            <div>             
                <Markdown>{answer}</Markdown>
            </div>
            <div>
                <img style={{ width: '10vh' }} src={image} />
            </div>
            <Stack direction="row" justifyContent="center" spacing={2} className="footer">
                <Fab onClick={() => setIsTexting(false)}><StopIcon /></Fab>
                <Fab onClick={() => {
                    document.getElementById("imageCapture").click();
                }}><CameraAltIcon /></Fab>
            </Stack>
        </Stack>
    </div>
}