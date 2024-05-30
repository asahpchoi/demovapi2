import { loadRoles } from "../libs/roles.js";
import {
    Button,
    Stack,
    TextField,
    Modal
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import { useEffect, useState } from "react";
import { getID, updateData } from "../libs/state.mjs";

export const Login = ({ args }) => {
    const [inputName, setInputName] = useState("");

    return <Stack className="overlay">

        <TextField
            fullWidth
            label="Your Name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            required="true"
        />
        <Button
            onClick={async () => {
                //setName(inputName);
                if (inputName) {
                    const sid = await getID();
                    await updateData(sid, inputName);
                    console.log({
                        sid, inputName
                    })
                    window.location.replace("?sid=" + sid);
                }
            }}
        >
            Go
        </Button>
    </Stack>


}