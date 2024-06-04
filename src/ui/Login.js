
import {
    Button,
    Stack,
    TextField,
 
} from "@mui/material";
import { useState } from "react";
import { getID, updateData } from "../libs/state.mjs";
import bg from "../images/background.svg"
import logo from "../images/logo.svg";
import listen from "../images/listen.svg";

export const Login = ({ args }) => {
    const [inputName, setInputName] = useState("");

    return <Stack className="flex justify-center overlay bg" style={{ backgroundImage: `url(${bg}` }}>

        <div className="absolute top-0 left-0 flex align-middle">
            <img src={logo} className="w-40 ml-7" alt="logo" />
            <h2 className="p-10 font-bold">FWD Gen AI build your bot</h2>
        </div>
        <div className="flex flex-col text-center" style={{ marginTop: -200 }}>
            <img src={listen} className="h-64 -mb-20" alt="listen" />
            <div className="text-3xl w-auto font-bold">Hello, Nice to have you here.</div>
            <div className="text-5xl w-auto font-bold py-6">What is your name?</div>
            <div className="flex" >
                <div className="flex-grow"></div>
                <TextField className="w300 bg-white"
                    label="Name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyDown={async (e) => {
                        if (e.keyCode === 13) {
                            if (inputName) {
                                const sid = await getID();
                                await updateData(sid, inputName);
                                console.log({
                                    sid, inputName
                                })
                                window.location.replace("?sid=" + sid);
                            }
                        }
                    }}
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