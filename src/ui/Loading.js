
import {
    Typography,
    CircularProgress,
} from "@mui/material";
export function Loading() {
    return <div className="loading">
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
    </div>
}