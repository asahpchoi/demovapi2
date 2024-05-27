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
import { call, stopCall, setCallback } from "./libs/util.js";
import { loadRoles } from "./libs/roles.js";
import { callLLM, checkSentiment } from "./libs/llm.mjs";
import { getID, updateData, getData, getUsers } from "./libs/state.mjs";
import { products } from "./libs/products.js";
import Vapi from "@vapi-ai/web";
import "./App.css";

import { CallUI } from "./ui/CallUI.js";
import { TextUI } from "./ui/TextUI.js";

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
  const [image, setImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [transcripts, setTranscripts] = useState([])
  const [currentMessage, setCurrentMessage] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");
  const [roles, setRoles] = useState([])




  // useEffect hook to initialize data on component mount
  useEffect(() => {
    async function init() {
      const params = new URLSearchParams(document.location.search);
      const sid = params.get("sid");
      setRoles(await loadRoles());

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

  const callback = async (message) => {

    if (message.type == "transcript") {

      console.log(message.transcript)
      setCurrentMessage(message.transcript)

      if (message.transcriptType == "final") {
        setTranscripts(transcripts.concat([{
          role: message.role,
          transcript: currentMessage
        }]))
        setCurrentMessage("");
        const sentimentReply = await checkSentiment(JSON.stringify(transcripts));
        setSentiment(sentimentReply)
      }
    }
  }

  setCallback(callback)
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
        <Button onClick={handleClick}>Provide your name</Button>
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
        <TextUI args={{ setUserPrompt, setAnswer, callLLM, prompt, userPrompt, image, history, setHistory, setIsTexting, setImage, answer }} />
      </Modal>

      {/* Modal for calling interaction */}
      <Modal open={isCalling}>
        <CallUI args={{ prompt, transcripts, currentMessage, sentiment, setIsCalling }} />
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
        <CardActions  >
          <Stack direction="row" spacing={2}  >
            <Fab onClick={() => {
              setTranscripts([]);
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
