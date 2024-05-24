import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Fab,
  FormControl,
  MenuItem,
  Modal,
  Popper,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
  CircularProgress
} from "@mui/material";
import {
  Call as CallIcon,
  Stop as StopIcon,
  Textsms as TextsmsIcon
} from '@mui/icons-material';
import { call, stopCall } from "./libs/util.js";
import { roles } from "./libs/roles.js";
import { callLLM } from "./libs/llm.mjs";
import { getID, updateData, getData, getUsers } from "./libs/state.mjs";
import { products } from "./libs/products.js";
import Vapi from "@vapi-ai/web";
import "./App.css";

export default function App() {
  // State variables for managing various application states
  const [loading, setLoading] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState("how are you?");
  const [prompt, setPrompt] = useState("you are a professional agent");
  const [isCalling, setIsCalling] = useState(false);
  const [isTexting, setIsTexting] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [name, setName] = useState();
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputName, setInputName] = useState(name);
  const [userlist, setUserlist] = useState([]);
  const [includeProduct, setIncludeProduct] = useState(false);

  // useEffect hook to initialize data on component mount
  useEffect(() => {
    async function init() {
      const params = new URLSearchParams(document.location.search);
      const sid = params.get("sid");
      if (sid) {
        const data = await getData(sid);
        setName(data[0].username);
        setPrompt(data[0].systemPrompt);
        setSessionId(sid);
      }
      const userl = await getUsers();
      setUserlist(userl);
      setLoading(false); // Set loading to false once data is fetched
    }
    init();
  }, [name]);

  // Function to render role buttons
  const renderRole = (role) => (
    <Button key={role} onClick={() => setPrompt(roles[role].prompt)}>
      {role}
    </Button>
  );

  // Function to display the login popper
  const showLogin = () => {
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      setLoginOpen((previousOpen) => !previousOpen);
    };

    return (
      <div>
        <Button onClick={handleClick}>Login</Button>
        <Popper open={loginOpen} anchorEl={anchorEl}>
          <Stack direction="row" style={{ backgroundColor: 'white', padding: '10px', margin: '10px' }}>
            <TextField
              fullWidth
              label="Your Name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Button
              onClick={async () => {
                setName(inputName);
                setLoginOpen(false);
                const sid = await getID();
                updateData(sid, inputName, prompt);
                window.location.replace("?sid=" + sid);
              }}
            >
              Update
            </Button>
          </Stack>
        </Popper>
      </div>
    );
  };

  // Render loading spinner if data is still being fetched
  if (loading) {
    return (
      <div className="loading">
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Modal for texting interaction */}
      <Modal open={isTexting}>
        <div className="fullscreen">
          <Stack justifyContent="center" style={{ padding: "10px" }}>
            <TextField
              label="Ask a question"
              fullWidth
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              onKeyDown={async (e) => {
                if (e.keyCode === 13) {
                  setUserPrompt("");
                  const answer = await callLLM(prompt, userPrompt);
                  setAnswer(answer);
                }
              }}
            />
            <Stack direction="row" justifyContent="center">
              <Button
                onClick={async () => {
                  const answer = await callLLM(prompt, userPrompt);
                  setAnswer(answer);
                }}
              >
                Ask
              </Button>
              <Button onClick={() => setIsTexting(false)}>Close</Button>
            </Stack>
            <Typography>Answer: {answer}</Typography>
          </Stack>
        </div>
      </Modal>

      {/* Modal for calling interaction */}
      <Modal open={isCalling}>
        <Stack className="overlay" spacing={2} justifyContent="center">
          <Fab onClick={() => {
            setIsCalling(false);
            stopCall();
          }}>
            <StopIcon />
          </Fab>
        </Stack>
      </Modal>

      {/* AppBar with login and user selection */}
      <Box>
        <AppBar position="static" style={{ backgroundColor: "#FF7900" }}>
          <Toolbar>
            FWD AI Demo
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {!sessionId ? showLogin() : <Button>{name}</Button>}
            </Typography>
            Change to
            <Select
              onChange={(event) => {
                const id = event.target.value;
                window.location.replace(`?sid=${id}`);
              }}
              value={sessionId}
            >
              {userlist.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Main card for prompt and role selection */}
      <Card>
        <CardMedia />
        <CardContent>
          {Object.keys(roles).map(renderRole)}
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Welcome Message"
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
            />
            <TextField
              multiline
              rows="5"
              label="Prompt / Instruction"
              fullWidth
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                updateData(sessionId, name, e.target.value);
              }}
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Fab onClick={() => {
              call(welcomeMessage, prompt, includeProduct ? products : {});
              setIsCalling(true);
            }}>
              <CallIcon />
            </Fab>
            <Fab onClick={() => setIsTexting(true)}>
              <TextsmsIcon />
            </Fab>
          </Stack>
        </CardActions>
      </Card>

      {/* Checkbox for including product knowledge */}
      <Card>
        <Stack direction="row">
          <Checkbox
            checked={includeProduct}
            onChange={() => setIncludeProduct(!includeProduct)}
          />
          <Typography variant="h6">Include Product Knowledge (Set for Life)</Typography>
        </Stack>
      </Card>
    </div>
  );
}
