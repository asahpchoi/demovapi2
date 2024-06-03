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
    return <div className="bg-fwd-100 p-5" >
        <h3>You can use your mobile to scan the QR code and upload an image</h3>
        <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`${window.location.href}&upload=1`}
            viewBox={`0 0 256 256`}
        />
    </div>

}