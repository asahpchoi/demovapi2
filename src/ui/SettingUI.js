import {
    Fab,
    Stack,
    Button,
    TextField
} from "@mui/material";
import {
    Stop as StopIcon,
} from '@mui/icons-material';
import { removeData, getSettings } from "../libs/state.mjs"
import { useState } from 'react';

export const SettingUI = ({ args }) => {
    const { setIsSetting, setUserlist } = args;
    const [instruction, setInstruction] = useState("")
    getSettings("instruction").then(setInstruction);

    return <Stack className="overlay p-5"  >
        <Button onClick={() => {
            removeData();
            setUserlist([]);
        }}>Delete History</Button>
        <TextField value={instruction} label="Instruction" multiline
            rows="8" />
        <Stack direction="row" justifyContent="center" className="footer">
            <Fab onClick={() => {
                setIsSetting(false);
            }}>
                <StopIcon />
            </Fab>

        </Stack>
    </Stack>
}