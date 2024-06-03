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
    const { prompt, transcripts, currentMessage, sentiment, rag } = args;

    return <div className="flex flex-col max-w-[726px] bg-fwd-100"  >
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

    </div>

}