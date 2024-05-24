import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Fab from '@mui/material/Fab';
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { call } from "./util.js";
import CallIcon from '@mui/icons-material/Call';
import StopIcon from '@mui/icons-material/Stop';

export default function App() {
  //const private_key = "9175acca-10da-411e-adb4-60d9fb4b0851";

  const [welcomeMessage, setWelcomeMessage] = useState("how are you?");
  const [prompt, setPrompt] = useState(`you are a professional agent`);
  const [isCalling, setIsCalling] = useState(false);
  return (
    <div className="App">
      <Card fullWidth>
        <CardMedia />
        <CardContent>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Welcome Message"
              value={welcomeMessage}
              onChange={(e) => {
                setWelcomeMessage(e.target.value);
              }}
            />
            <br />
            <TextField
              multiline
              rows="5"
              label="Prompt / Instruction"
              fullWidth
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
          </Stack>
        </CardContent>
        <CardActions  >
          <Stack direction="row" spacing={2}>
            <Fab style={{ "backgroundColor": "green" }}
              onClick={() => {
                call(welcomeMessage, prompt);
                setIsCalling(true);
              }}
              disabled={isCalling}
            >
              <CallIcon />
            </Fab>
            <Fab disabled={!isCalling}
              style={{ "backgroundColor": "red" }}
              onClick={() => {

                setIsCalling(false);
                window.location.reload();
              }}
            >
              <StopIcon />
            </Fab>

          </Stack>



        </CardActions>
      </Card>
    </div>
  );
}
