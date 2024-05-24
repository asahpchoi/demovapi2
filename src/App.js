import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Fab from '@mui/material/Fab';
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { call } from "./libs/util.js";
import CallIcon from '@mui/icons-material/Call';
import StopIcon from '@mui/icons-material/Stop';
import { roles } from "./libs/roles.js";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./App.css";
import { callLLM } from "./libs/llm.mjs";

export default function App() {
  const [welcomeMessage, setWelcomeMessage] = useState("how are you?");
  const [prompt, setPrompt] = useState(`you are a professional agent`);
  const [isCalling, setIsCalling] = useState(false);
  const [userPrompt, setUserPrompt] = useState(``)
  const [answer, setAnswer] = useState(``)
  console.log({ roles })

  const renderRole = (r) => {
    return <Button onClick={() => {
      console.log(roles[r].prompt)
      setPrompt(roles[r].prompt)
    }}>{r}</Button>
  }

  return (
    <div className="App">
      <Modal open={isCalling} >
        <Stack className="overlay" spacing={2}>
          <TextField
            multiline
            rows="5"
            label="Ask your Agent"
            fullWidth
            value={userPrompt}
            onChange={(e) => {
              setUserPrompt(e.target.value);
            }}
          />

          <Button onClick={async () => {
            const answer = await callLLM(prompt, userPrompt);
            setAnswer(answer)
          }}>Ask</Button>

          {answer}

          <div className="center">
            <Fab
              style={{ "backgroundColor": "red" }}
              onClick={() => {
                setIsCalling(false);
                window.location.reload();
              }}
            >
              <StopIcon />
            </Fab>
          </div>
        </Stack>
      </Modal>
      <Card fullWidth>
        <CardMedia />
        <CardContent>

          <Stack spacing={2}>
            <ButtonGroup>
              {
                Object.keys(roles).map(k => renderRole(k))
              }
            </ButtonGroup>
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
        <CardActions>
          <Stack direction="row" spacing={2}>
            <div className="center">
              <Fab style={{ "backgroundColor": "green" }}
                onClick={() => {
                  call(welcomeMessage, prompt);
                  setIsCalling(true);
                }}
                disabled={isCalling}
              >
                <CallIcon />
              </Fab>
            </div>
          </Stack>


        </CardActions>
      </Card>
    </div>
  );
}
