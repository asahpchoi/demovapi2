import {

    Stack,
    Button,

} from "@mui/material";

export const ImageControl = (args) => {

    return <Stack style={{ padding: '1em' }}>
        <img src={args.image} style={{ width: "10vw" }} />
        <Button onClick={() => { args.setImage(null) }}>Delete</Button>
    </Stack>
}