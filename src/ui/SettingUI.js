import {
    Fab,
    Stack,
    Button,
    TextField
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { removeUser, getSettings, getUsers } from "../libs/state.mjs"
import { useState } from 'react';

export const SettingUI = ({ args }) => {
    const { setIsSetting, setUserlist } = args;
    const [instruction, setInstruction] = useState("")
    const [users, setUsers] = useState([])
    getSettings("instruction").then(setInstruction);
    getUsers().then(setUsers)



    return <Stack className="overlay p-5"  >


        <CloseIcon
            className="fixed top-0  right-0 m-5"
            onClick={() => {
                setIsSetting(false);
            }}>

        </CloseIcon>
        <Stack direction="row" className="mt-10">
            <Stack className="w-1/2">
                <div>Remove User</div>
                {users.map(u => <Button onClick={() => {
                    removeUser(u.id)

                }}> {u.username}</Button>)}

            </Stack>

            <TextField value={instruction}
                className="w-1/2"
                label="Instruction"
                multiline
                rows="8"
            />
        </Stack>
        <Button>Update</Button>
 

    </Stack >
}