import {
    Fab,
    Stack,
} from "@mui/material";
import {
    Stop as StopIcon,
} from '@mui/icons-material';
import { stopCall } from "../libs/util.js";
import Markdown from 'react-markdown';
export const CallUI = ({ args }) => {
    const { prompt, transcripts, currentMessage, sentiment, setIsCalling } = args;
    console.log({ args })
    return <Stack className="overlay content"  >
        <Stack style={{ height: "10vh", overflow: "scroll" }}>
            Role Prompt: {prompt}
        </Stack>
        <Stack style={{ height: "50vh", overflow: "scroll" }}>
            Transcript:
            {
                transcripts.map(
                    (t, i) => <div id={i}>{t.role}: {t.transcript}</div>
                )
            }
            {
                currentMessage
            }
        </Stack>
        <Stack style={{ height: "30vh", overflow: "scroll" }}>
            <Markdown>##Sentiment: {sentiment}</Markdown>
        </Stack>
        <Stack direction="row" justifyContent="center" className="footer">
            <Fab onClick={() => {
                setIsCalling(false);
                stopCall();
            }}>
                <StopIcon />
            </Fab>
        </Stack>
    </Stack>

}