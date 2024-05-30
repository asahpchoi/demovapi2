import { useState } from 'react';
import {
    Fab,
    Stack,
    Paper,
    Button
} from "@mui/material";



export const RagSection = (args) => {
    const [files, setFiles] = useState([{ name: 'Set for Life', selected: false, content: "" },
    { name: 'Endowment', selected: false, content: "" },
    { name: 'Claim process', selected: false, content: "" }]);
    console.log({a: args.setRAG})
    return <div style={{ width: "100%" }}><h4>Select files for RAG</h4>
        <Stack direction="row" spacing={2} style={{ width: "100%", padding: "1em" }}>
            <Paper style={{ width: "100%" }}>
                <Stack spacing={2}>
                    <h4>Available files</h4>
                    {files.filter(x => !x.selected).map(f => <Button onClick={x => {
                        const fx = files.find(f2 => f2.name == f.name);
                        fx.selected = true;
                        setFiles([...files]);
                        const RAGdata = files.filter(x => x.selected).map(x => x.content).join(" ");
                        args.setRAG(RAGdata)
                    }}>{f.name}</Button>
                    )}
                </Stack>
            </Paper >
            <Paper style={{ width: "100%" }}>
                <Stack spacing={2}>
                    <h4>Selected files</h4>
                    {files.filter(x => x.selected).map(f => <Button onClick={x => {
                        const fx = files.find(f2 => f2.name == f.name);
                        fx.selected = false;
                        setFiles([...files]);
                        const RAGdata = files.filter(x => x.selected).map(x => x.content).join(" ");
                        args.setRAG(RAGdata)
                    }}>{f.name}</Button>
                    )}
                </Stack>
            </Paper >
        </Stack >
    </div>
};