import {
    AppBar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Checkbox,
    Fab,
    FormControl,
    MenuItem,
    Modal,
    Popper,
    Select,
    Stack,
    TextField,
    Toolbar,
    Typography,
    CircularProgress
} from "@mui/material";
import {
    Call as CallIcon,
    Stop as StopIcon,
    Textsms as TextsmsIcon
} from '@mui/icons-material';
import { stopCall } from "../libs/util.js";

export const CallUI = ({args}) => {
    const {prompt, transcripts, currentMessage, sentiment, setIsCalling} = args;
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
            <Fab onClick={() => {
                setIsCalling(false);
                stopCall();
            }}>
                <StopIcon />
            </Fab>
        </Stack>
    </>
}