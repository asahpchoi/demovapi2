import { useEffect, useState } from "react";
import { loadRoles } from "../libs/roles.js";
import {
    Button,
    Stack,
    Fab
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import WorkIcon from '@mui/icons-material/Work';
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

    return <>
        <Fab onClick={toggleDrawer(true)}><WorkIcon /></Fab>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <Stack style={{ padding: "3px", width: "100vw" }}>
                {Object.keys(roles).map(renderRole)}
            </Stack>
        </Drawer></>
}