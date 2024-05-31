
import {
    Button,
    Stack,
    TextField,
    AppBar
} from "@mui/material";
import { useState } from "react";
import { getID, updateData } from "../libs/state.mjs";
import bg from '../images/background.svg';
import logo from "../images/logo.svg";
import listen from "../images/listen.svg";

export const Login = ({ args }) => {
    const [inputName, setInputName] = useState("");

    return <Stack className="overlay flex justify-center" >
        <img alt="BG" loading="lazy" src={bg} className="absolute z-0 bottom-0" />
        <div className="absolute top-0 left-0 flex align-middle   ">
            <img src={logo} className="w-40" />
            <h2 className="p-10 font-bold">FWD Gen AI build your bot</h2>
        </div>
        <div className="flex flex-col text-center">
            <img src={listen} className="h-48" />
            <div className="text-3xl w-auto font-bold z-1">Hello, Nice to have you here.</div>
            <div className="text-5xl w-auto font-bold py-6 z-1">What is your name?</div>
            <div className="flex z-1" >
                <div className="flex-grow"></div>
                <TextField className="w300 bg-white"
                    label="Name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
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
                <div className="flex-grow"></div>
            </div>
        </div>
    </Stack>


}