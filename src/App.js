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
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./App.css";
import { callLLM } from "./libs/llm.mjs";
import TextsmsIcon from '@mui/icons-material/Textsms';

import AppBar from '@mui/material/AppBar';
export default function App() {
  const [welcomeMessage, setWelcomeMessage] = useState("how are you?");
  const [prompt, setPrompt] = useState(`you are a professional agent`);
  const [isCalling, setIsCalling] = useState(false);
  const [isTexting, setIsTexting] = useState(false);
  const [userPrompt, setUserPrompt] = useState(``)
  const [answer, setAnswer] = useState(``)


  const renderRole = (r) => {
    return <Button onClick={() => {

      setPrompt(roles[r].prompt)
    }}>{r}</Button>
  }

  return (
    <div className="App">
      <Modal open={isTexting}  >
        <div className="fullscreen">
          <Stack justifyContent="center" style={{padding: "10px"}}>
            <TextField
              label="Ask a question"
              fullWidth
              value={userPrompt}
              onChange={(e) => {
                setUserPrompt(e.target.value);
              }}
              onKeyDown={
                async (e) => {
                  if (e.keyCode === 13) {
                    setUserPrompt("");
                    const answer = await callLLM(prompt, userPrompt);
                    setAnswer(answer)
                  }
                }
              }
            />
            <Stack direction="row" justifyContent="center">
              <Button onClick={async () => {
                const answer = await callLLM(prompt, userPrompt);
                setAnswer(answer)
              }}>Ask</Button>
              <Button onClick={() => setIsTexting(false)}>Close</Button>
            </Stack>
            <Typography> Answer: {answer}</Typography>

          </Stack>
        </div>
      </Modal>
      <Modal open={isCalling} >
        <Stack className="overlay" spacing={2} justifyContent="center" className="center">


          <Fab

            onClick={() => {
              setIsCalling(false);
              window.location.reload();
            }}
          >
            <StopIcon />
          </Fab>

        </Stack>
      </Modal>
      <AppBar position="static" style={{ "backgroundColor": "#FF7900" }}>
        <Toolbar>

          <Typography  >
            FWD AI Demo
          </Typography>

        </Toolbar>
      </AppBar>
      <Card fullWidth>
        <CardMedia />
        <CardContent>

          {
            Object.keys(roles).map(k => renderRole(k))
          }
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
        <CardActions>
          <Stack direction="row" spacing={2} justifyContent="center" fullWidth className="center">


            <Fab
              onClick={() => {
                call(welcomeMessage, prompt);
                setIsCalling(true);
              }}

            >
              <CallIcon />
            </Fab>
            <Fab
              onClick={() => {
                setIsTexting(true);
              }}

            >
              <TextsmsIcon />
            </Fab>

          </Stack>


        </CardActions>
      </Card>
    </div >
  );
}
