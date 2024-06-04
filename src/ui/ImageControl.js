import {

    Stack,
    Button,

} from "@mui/material";
import * as React from "react";

export const ImageControl = (args) => {
    const [imgSize, setImgSize] = React.useState("10vw");

    return <Stack style={{ padding: '1em', position: 'absolute', top: 0, right: 0, }}>
        <img alt="th" src={args.image} style={{ width: imgSize }} onClick={() => {
            setImgSize(imgSize == "10vw" ? "70vw" : "10vw")
        }} />
        <Button onClick={() => { args.setImage(null) }}>Delete</Button>
    </Stack>
}