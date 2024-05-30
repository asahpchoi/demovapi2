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
            
        />
        <Button
            onClick={async () => {
                //setName(inputName);
            
                const sid = await getID();
                updateData(sid, inputName, prompt);
                window.location.replace("?sid=" + sid);
            }}
        >
            Go
        </Button>
    </Stack>


}