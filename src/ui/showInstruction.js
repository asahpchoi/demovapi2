import {
    Paper
} from "@mui/material";
import Markdown from "react-markdown";
import { instructions } from "../libs/instruction.js";

export const showInstruction = () => {
    return <Paper className="halfpage" elevation="3">
        <div className="text-xl font-bold   text-left">Tips for for your instructions</div>
        <Markdown className="markdown">
            {instructions}
        </Markdown>

    </Paper>
}
