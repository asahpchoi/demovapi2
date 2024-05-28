import {
 
    Fab,
 
    Stack,
 
} from "@mui/material";
import {
    Call as CallIcon,
    Stop as StopIcon,
    Textsms as TextsmsIcon
} from '@mui/icons-material';
import { stopCall } from "../libs/util.js";

export const CallUI = ({ args }) => {
    const { prompt, transcripts, currentMessage, sentiment, setIsCalling } = args;
    console.log({ args })
    return <>
        <Stack className="overlay" spacing={2} style={{ "textAlign": "middle" }}>
            <div>
                {prompt}
            </div>
            <div style={{ height: "50vh", overflow: "scroll" }}>
                {
                    transcripts.map(
                        (t, i) => <div id={i}>{t.role}: {t.transcript}</div>
                    )
                }
                {
                    currentMessage
                }
            </div>
            Sentiment: {sentiment}
            <Stack direction="row" justifyContent="center"> 
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