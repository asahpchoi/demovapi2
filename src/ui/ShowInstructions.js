import {
    Paper, Fab, Button, Stack
} from "@mui/material";
import Markdown from "react-markdown";
import { getSettings } from "../libs/state.mjs";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export const ShowInstructions = (args) => {

    const [instruction, setInstruction] = useState("")
    getSettings("instruction").then(data => {
        setInstruction(data)
    })
    return <Paper className="halfpage pt-5" style={{ backgroundColor: '#FEF9F4' }} elevation="3">
        <div className="flex">
            <div className="text-xl font-bold text-left flex-grow">Tips for for your instructions</div>
            <CloseIcon onClick={() => {
                args.setDisplayMode("test")
            }}> </CloseIcon>
        </div>
        <Markdown className="markdown mt-5">
            {instruction}
        </Markdown>
    </Paper>
}
