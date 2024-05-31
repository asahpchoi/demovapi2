
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

    return <Stack className="overlay" >
        <img alt="BG" loading="lazy" src={bg} className="absolute bottom-0" />
        <div className="absolute top-0 left-0 flex align-middle   ">
            <img src={logo} className="w-40" />
            <h2 className="p-10 font-bold">FWD Gen AI build your bot</h2>
        </div>
        <div className="flex flex-col text-center mt-40">
            <img src={listen} className="h-40"/>
            <div className="text-3xl w-auto font-bold">Hello, Nice to have you here.</div>
            <div className="text-5xl w-auto font-bold py-6">What is your name?</div>
            <div className="flex px-96" >
                <TextField className="flex-grow" 
                    label="Your Name"
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
            </div>
        </div>
    </Stack>


}