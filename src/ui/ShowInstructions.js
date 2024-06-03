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
    return <div className="halfpage pt-5" style={{ backgroundColor: '#FEF9F4', zIndex: 1 }} elevation="3">
        <div className="flex">
            <div className="text-xl font-bold text-left flex-grow">Tips for for your instructions</div>
            <CloseIcon onClick={() => {
                args.setDisplayMode("test")
            }}> </CloseIcon>
        </div>

        <pre style={{ textAlign: "left", overflow: "auto", textWrap: "wrap", margin: '2em', height: '60vh'}}>
            {instruction}
        </pre>


    </div>
}
