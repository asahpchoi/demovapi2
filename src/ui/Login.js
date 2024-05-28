import { loadRoles } from "../libs/roles.js";
import {
    Button,
    Stack,
    TextField
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from "react";
import { getID, updateData } from "../libs/state.mjs";

export const Login = ({ args }) => {
    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState(name);

    return <Stack>
        <Button onClick={() => { setOpen(true) }}>Login</Button>
        <Drawer open={open}>
            <Stack fullWidth style={{ padding: "3px", width: "100vw" }}>
                <TextField
                    fullWidth
                    label="Your Name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                />
                <Button
                    onClick={async () => {
                        //setName(inputName);
                        setOpen(false);
                        const sid = await getID();
                        updateData(sid, inputName, prompt);
                        window.location.replace("?sid=" + sid);
                    }}
                >
                    Update
                </Button>
            </Stack>
        </Drawer>
    </Stack>
}