/*import { useState } from 'react';
import {
    Fab,
    Stack,
    Paper,
    Button
} from "@mui/material";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ragdata } from '../libs/ragdata';

export const RagSection = (args) => {
    const [files, setFiles] = useState(ragdata);
    

    return <div style={{ width: "100%" }}><h4>Select files for RAG</h4>
        <Stack direction="row" spacing={2} style={{ width: "100%", padding: "1em" }}>
            <Paper style={{ width: "100%" }}>
                <Stack spacing={2}>
                    <h4>Available files</h4>
                    {files.filter(x => !x.selected).map(f => <Stack direction="row">
                        <Button onClick={x => {
                            const fx = files.find(f2 => f2.name == f.name);
                            fx.selected = true;
                            setFiles([...files]);
                            const RAGdata = files.filter(x => x.selected).map(x => x.content).join(" ");
                            args.setRAG(RAGdata)
                        }}><AddIcon /></Button>
                        <PictureAsPdfIcon></PictureAsPdfIcon>{f.name}
                    </Stack>
                    )}
                </Stack>
                <Button onClick={()=>{args.setDisplayMode("info")}}>Close</Button>
            </Paper >
            <Paper style={{ width: "100%" }}>
                <Stack spacing={2}>
                    <h4>Selected files</h4>
                    {files.filter(x => x.selected).map(f => <Stack direction="row">
                        <Button onClick={x => {
                            const fx = files.find(f2 => f2.name == f.name);
                            fx.selected = false;
                            setFiles([...files]);
                            const RAGdata = files.filter(x => x.selected).map(x => x.content).join(" ");
                            args.setRAG(RAGdata)
                        }}><RemoveIcon /></Button>
                        <PictureAsPdfIcon></PictureAsPdfIcon>{f.name}
                    </Stack>
                    )}
                </Stack>
            </Paper >
        </Stack >
    </div>
};
*/
import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { ragdata } from '../libs/ragdata';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export function RagSection(args) {
    const [files, setFiles] = React.useState(ragdata);


    const handleToggle = (value) => () => {

    };

    const customList = (items) => (
        <Paper className='h-100'>
            <List dense component="div" role="list" >
                {items.map((i) => {
                    const labelId = `transfer-list-item-${i.id}-label`;
                    return (
                        <ListItemButton
                            key={i.id}
                            role="listitem"
                            onClick={() => {
                                const newlist = files.map(
                                    f => {
                                        return {
                                            id: f.id,
                                            name: f.name,
                                            content: f.content,
                                            selected: f.id == i.id ? !f.selected : f.selected
                                        }
                                    }
                                )
                                console.log({ newlist });
                                setFiles(newlist);
                            }}
                        >

                            <ListItemText id={labelId} primary={i.name} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>
    );

    return (

        <div className='w-8/12 m-24 bg-fwd-100 p-5' >
            <Grid container spacing={2} justifyContent="center" alignItems="center" >
                <Grid item xs={12}>Select documents </Grid>
                <Grid item xs={6}>Available documents</Grid>
                <Grid item xs={6}>Selected documents</Grid>
                <Grid item xs={6}>{customList(files.filter(f => !f.selected))}</Grid>
                <Grid item xs={6}>{customList(files.filter(f => f.selected))}</Grid>
                <Grid item xs={12}><Button onClick={() => {
                    const RAGdata = files.filter(x => x.selected).map(x => x.content).join(" ");
                    args.setRAG(RAGdata)
                    args.setDisplayMode("test");
                }}>Done</Button></Grid>
            </Grid>
        </div>


    );
}