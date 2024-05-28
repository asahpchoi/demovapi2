import { useEffect, useState } from "react";
import { loadRoles } from "../libs/roles.js";
import {
    Button,
    Stack,
} from "@mui/material";
import Drawer from '@mui/material/Drawer';

export const PromptTemplate = ({ args }) => {
    const { setPrompt } = args;
    const [roles, setRoles] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(async () => {
        setRoles(await loadRoles());
    }, [])

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // Function to render role buttons
    const renderRole = (role) => (
        <Button key={role} onClick={() => {
            setPrompt(roles[role].prompt);
            setOpen(false);
        }}>
            {role}
        </Button>
    );

    return <> <Button onClick={toggleDrawer(true)}>Select role template</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <Stack style={{ padding: "3px" ,width: "100vw" }}>
                {Object.keys(roles).map(renderRole)}
            </Stack>
        </Drawer></>
}