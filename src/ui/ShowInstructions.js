import { getSettings } from "../libs/state.mjs";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export const ShowInstructions = (args) => {

    const [instruction, setInstruction] = useState("")
    getSettings("instruction").then(data => {
        setInstruction(data)
    })
    return <div className="md:w-1/2 w-full pt-5 bg-fwd-100 p-5"   elevation="3">
        <div className="flex">
            <div className="text-xl font-bold text-left flex-grow">Tips for for your instructions</div>
            <CloseIcon onClick={() => {
                args.setDisplayMode("test")
            }}> </CloseIcon>
        </div>

        <pre style={{ textAlign: "left", overflow: "auto", textWrap: "wrap", margin: '2em', height: '80vh' }}>
            {instruction}
        </pre>
    </div>
}
