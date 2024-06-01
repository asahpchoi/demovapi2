import QRCode from "react-qr-code";
import {
    AppBar,
    Button,
    Checkbox,
    Fab,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
    Toolbar,
    Typography,
    CircularProgress
} from "@mui/material";

export const ShowQR = () => {
    return <Stack className="overlay">
        <div style={{ height: "auto", margin: "0 auto", maxWidth: "50vh", width: "100%" }}>
            <h3>You can use your mobile to scan the QR code and upload an image</h3>
            <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`${window.location.href}&upload=1`}
                viewBox={`0 0 256 256`}
            />

            <Button onClick={async () => {
                document.location.reload();
            }}>Close</Button>
        </div>
    </Stack>
}