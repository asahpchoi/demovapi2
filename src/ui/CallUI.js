import {
 
    Stack,
} from "@mui/material";
 
export const CallUI = ({ args }) => {
    const { prompt, transcripts, currentMessage } = args;

    return <div className="flex flex-col w-9/12 bg-fwd-100"  >
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