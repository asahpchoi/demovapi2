import {
    Fab,
    Stack,
} from "@mui/material";
import {
    Stop as StopIcon,
} from '@mui/icons-material';
import { stopCall } from "../libs/util.js";

export const CallUI = ({ args }) => {
    const { prompt, transcripts, currentMessage, sentiment, setIsCalling } = args;
    console.log({ args })
    return <>
        <Stack className="overlay"  >
            <div>
                Role Prompt: {prompt}
            </div>
            <div style={{ height: "50vh", overflow: "scroll" }}>
                Transcript:
                {
                    transcripts.map(
                        (t, i) => <div id={i}>{t.role}: {t.transcript}</div>
                    )
                }
                {
                    currentMessage
                }
            </div>
            <div>  Sentiment: {sentiment} </div>

            <Stack direction="row" justifyContent="center" className="footer">
                <Fab onClick={() => {
                    setIsCalling(false);
                    stopCall();
                }}>
                    <StopIcon />
                </Fab>
            </Stack>
        </Stack>
    </>
}