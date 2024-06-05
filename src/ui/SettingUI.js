import {

    Stack,
    Button,
    TextField
} from "@mui/material";
import { removeUser, getSettings, getUsers, updateValue } from "../libs/state.mjs"
import { useState, useEffect } from 'react';

export const SettingUI = () => {

    const [instruction, setInstruction] = useState("")
    const [users, setUsers] = useState([])

    useEffect(() => {
        getSettings("instruction").then(setInstruction);
        getUsers().then(setUsers);
    }, [])


    return <Stack direction="row" className="mt-10 bg-fwd-100 w-9/12 p-5">
        <Stack className="w-1/2">
            <div>Remove User</div>
            {users.map(u => <Button onClick={() => {
                removeUser(u.id)

            }}> {u.username}</Button>)}

        </Stack>

        <TextField
            value={instruction}
            className="w-1/2"
            label="Instruction"
            multiline
            rows="8"
            onChange={e => setInstruction(e.target.value)}
        />
        <Button
            onClick={() => {
                updateValue("instruction", instruction)
            }
            }>Update</Button>
    </Stack>




}