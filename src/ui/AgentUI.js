import {
    Fab,
    Stack,
    Button,
    TextField,
    useForkRef,
} from "@mui/material";
import { createAssistant, listAssistants, updateAssistant, removeAssisant, callAssistant } from "../libs/agent.mjs";
import { useState, useEffect } from "react";


export const AgentUI = ({ args }) => {
    const { prompt, transcripts, currentMessage, sentiment, setIsCalling } = args;

    const [assistants, setAssistants] = useState([]);
    const [assistant, setAssistant] = useState();
    const [mode, setMode] = useState("select");
    const [name, setName] = useState("");
    const [instructions, setInstructions] = useState("");
    const [question,setQuestion] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        listAssistants(setAssistants);
    }, [mode])

    function editAssistant() {
        return <Stack>
            <div>Name: <TextField value={name} onChange={(e) => setName(e.target.value)}></TextField>
            </div>
            <div>Instructions: <TextField value={instructions} onChange={(e) => setInstructions(e.target.value)}></TextField>
            </div>
            <Button onClick={() => {
                updateAssistant(assistant.id, name, instructions)
                setMode("select")
            }}>update</Button>
            <Button onClick={() => {
                removeAssisant(assistant.id);
                setMode("select")
            }}>remove</Button>
        </Stack >
    }

    return <>
        <Stack   >
            <Stack direction="row">
                <select onChange={(e) => {
                    setMode("edit");
                    const assi = assistants.find(b => {
                        return e.target.value === b.id
                    });
                    setAssistant(assi);
                    setName(assi.name);
                    setInstructions(assi.instructions)

                }}>{
                        assistants.map(a => {
                            return <option value={a.id}>{a.name}</option>
                        })
                    }</select>
            </Stack>
            <Stack>
                {mode == "edit" ? editAssistant() : ''}
            </Stack>
            {mode==="select"&&<Stack>
            Question: <TextField value={question} onChange={(e) => setQuestion(e.target.value)}/>
            username: <TextField value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Button onClick={() => {
                callAssistant(assistant.id, question, username, (error, data, obj) => {
                    console.log({
                        data, obj
                    })
                })
            }}>Run</Button>
            </Stack>}
        </Stack>
    </>
}