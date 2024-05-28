import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Fab,
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
  Textsms as TextsmsIcon
} from '@mui/icons-material';
import { call, setCallback } from "./libs/util.js";

import { callLLM, checkSentiment } from "./libs/llm.mjs";
import { getID, updateData, getData, getUsers } from "./libs/state.mjs";
import { products } from "./libs/products.js";
import "./App.css";

import { CallUI } from "./ui/CallUI.js";
import { TextUI } from "./ui/TextUI.js";
import { PromptTemplate } from "./ui/PromptTemplate.js";
import { Login } from "./ui/Login.js";
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
  const [userlist, setUserlist] = useState([]);
  const [includeProduct, setIncludeProduct] = useState(false);
  const [image, setImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [transcripts, setTranscripts] = useState([])
  const [currentMessage, setCurrentMessage] = useState("");
  const [sentiment, setSentiment] = useState("Neutral");




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

  const callback = async (message) => {
    if (message.type == "transcript") {
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
              {!sessionId ? <Login /> : <Button>{name}</Button>}
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
      <Stack style={{ margin: '10px' }}>
        <PromptTemplate args={{ setPrompt }} />
        <Stack spacing={2} style={{ margin: '10px' }}>
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
        <Stack direction="row">
          <Checkbox
            checked={includeProduct}
            onChange={() => setIncludeProduct(!includeProduct)}
          />
          <span>Include Product Knowledge (Set for Life)</span>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={2}>
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
      </Stack>
    </div>
  );
}
