import {
    Fab,
    Stack,
    Button
} from "@mui/material";
import {
    Stop as StopIcon,
} from '@mui/icons-material';
import { removeData } from "../libs/state.mjs"

export const SettingUI = ({ args }) => {
    const { setIsSetting, setUserlist } = args;

    return <Stack className="overlay"  >
        <Button onClick={() => {
            removeData();
            setUserlist([]);
        }}>Delete History</Button>
        <Stack direction="row" justifyContent="center" className="footer">
            <Fab onClick={() => {
                setIsSetting(false);


            }}>
                <StopIcon />
            </Fab>
        </Stack>
    </Stack>
}