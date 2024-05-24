import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";
import Fab from '@mui/material/Fab';
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { call, stopCall } from "./libs/util.js";
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
import { getID, updateData, getData, getUsers } from "./libs/state.mjs"
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import AppBar from '@mui/material/AppBar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { products } from "./libs/products.js"
import Checkbox from '@mui/material/Checkbox';

import Vapi from "@vapi-ai/web";
export default function App() {
  const [welcomeMessage, setWelcomeMessage] = useState("how are you?");
  const [prompt, setPrompt] = useState(`you are a professional agent`);
  const [isCalling, setIsCalling] = useState(false);
  const [isTexting, setIsTexting] = useState(false);
  const [userPrompt, setUserPrompt] = useState(``)
  const [answer, setAnswer] = useState(``)
  const [sessionId, setSessionId] = useState(null)
  const [name, setName] = useState();
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputName, setInputName] = useState(name);
  const [userlist, setUserlist] = useState([])
  const [includeProduct, setIncludeProduct] = React.useState(false);

  useEffect(() => {
    async function init() {

      const params = new URLSearchParams(document.location.search);
      const sid = params.get("sid");
      if (sid) {
        const data = await getData(sid);
        console.log({ data })
        setName(data[0].username)
        setPrompt(data[0].systemPrompt)
        setSessionId(sid);
      }
      const userl = await getUsers();
      setUserlist(userl);
      console.log(userl)

    }
    init()
  }, [name])

  const renderRole = (r) => {
    return <Button onClick={() => {

      setPrompt(roles[r].prompt);

    }}>{r}</Button>
  }
  const showLogin = () => {
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      setLoginOpen((previousOpen) => !previousOpen);
    };

    return <div> <Button onClick={handleClick}>
      Login
    </Button>
      <Popper open={loginOpen} anchorEl={anchorEl} >
        <Stack direction="row" style={{ backgroundColor: 'white', padding: '10px', margin: '10px' }}>
          <TextField
            fullWidth
            label="Your Name"
            value={inputName}
            onChange={e => setInputName(e.target.value)}
          />
          <Button
            onClick={async () => {
              setName(inputName);
              setLoginOpen(false);
              const sid = await getID();
              updateData(sid, inputName, prompt)
              //setSessionId(sid);
              window.location.replace("?sid=" + sid)
            }}
          >Update</Button>
        </Stack>
      </Popper >
    </div>
  }

  return (
    <div className="App">
      <Modal open={isTexting}  >
        <div className="fullscreen">
          <Stack justifyContent="center" style={{ padding: "10px" }}>
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
        <Stack className="overlay" spacing={2} justifyContent="center">

          <Fab

            onClick={() => {
              setIsCalling(false);
              stopCall();
              //window.location.reload();
            }}
          >
            <StopIcon />
          </Fab>

        </Stack>
      </Modal>
      <Box>
        <AppBar position="static" style={{ "backgroundColor": "#FF7900" }}>
          <Toolbar>
            FWD AI Demo
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {!sessionId ? showLogin() : <Button>{name}</Button>}
            </Typography>
            Change to  <Select

              onChange={(event) => {
                const id = event.target.value;
                window.location.replace(`?sid=${id}`)
              }}
            >
              {userlist.map(u => {
                return <MenuItem value={u.id} selected={u.id===sessionId}>{u.username}</MenuItem>
              })}
            </Select>
          </Toolbar>
        </AppBar>
      </Box>
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
                updateData(sessionId, name, e.target.value)
              }}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2} justifyContent="center" fullWidth className="center">
            <Fab
              onClick={() => {
                call(welcomeMessage, prompt, includeProduct ? products : {});
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
      <Card fullWidth>
        <Stack direction="row">
          <Checkbox onClick={() => {
            setIncludeProduct(!includeProduct)
          }}>Product</Checkbox>
          <h3>Include Product Knowledge (Set for Life)</h3>
        </Stack>
      </Card>
    </div >
  );
}
