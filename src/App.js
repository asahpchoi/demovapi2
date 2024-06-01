import React, { useState, useEffect } from "react";
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
import {
  AlignHorizontalLeft,
  Call as CallIcon,
  Textsms as TextsmsIcon
} from '@mui/icons-material';
import { call, setCallback, convertBase64 } from "./libs/util.js";
import SettingsIcon from '@mui/icons-material/Settings';
import { callLLM, checkSentiment } from "./libs/llm.mjs";
import { updateData, getData, getUsers } from "./libs/state.mjs";
import { products } from "./libs/products.js";
import "./App.css";

import { CallUI } from "./ui/CallUI.js";
import { TextUI } from "./ui/TextUI.js";
import { SettingUI } from "./ui/SettingUI.js";
import Paper from '@mui/material/Paper';

import { RagSection } from "./ui/RagSection.js";

import { PromptTemplate } from "./ui/PromptTemplate.js";
import { Login } from "./ui/Login.js";

import bg2 from "./images/bg2.svg"
import logo from "./images/logo.svg";
import { ShowQR } from "./ui/ShowQR.js";
import {showInstruction} from "./ui/showInstruction.js";

export default function App() {
  /// State variables for managing various application states
  const [loading, setLoading] = useState(true);

  const [prompt, setPrompt] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isTexting, setIsTexting] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
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
  const [uploadMode, setUploadMode] = useState(false);
  const [displayMode, setDisplayMode] = useState("info");
  const [rag, setRAG] = useState("");

  // useEffect hook to initialize data on component mount
  useEffect(() => {
    async function init() {
      const params = new URLSearchParams(document.location.search);
      const sid = params.get("sid");


      if (sid) {
        const data = await getData(sid);
        setName(data[0].username);
        setPrompt(data[0].systemPrompt);
        setImage(data[0].photo)
        setSessionId(sid);
      }
      const userl = await getUsers();
      setUserlist(userl);
      setLoading(false); // Set loading to false once data is fetched

      setUploadMode(params.get("upload"));

    }
    init();
  }, [name]);

  const callback = async (message) => {
    if (message.type === "transcript") {
      setCurrentMessage(message.transcript)
      if (message.transcriptType === "final") {
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
    <div className="App" style={{ "background-image": { bg2 } }}>
      <img src={bg2} loading="lazy" className="absolute bottom-0" style={{ zIndex: -1 }} />

      {/* AppBar with login and user selection */}
      <div position="static">
        <Toolbar className="flex ">
          <img src={logo} className="w-40" />
          <h2 className="p-10 font-bold">FWD Gen AI build your bot</h2>
          <div className="flex-grow"></div>
          FWD GenAI profile
          <Select
            onChange={(event) => {
              const id = event.target.value;
              window.location.replace(`?sid=${id}`);
            }}
            value={sessionId}
            className="m-2"
          >
            {userlist.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </Toolbar>
      </div>

      {/* Main card for prompt and role selection */}
      <Stack className="bg-zinc-100 z-1" direction={{ xs: 'column', sm: 'row' }} >
        <Paper className="halfpage " elevation="3" >
          <Stack spacing={2}  >
            <div className="text-xl font-bold   text-left">Setup your agent bot</div>
            <TextField
              multiline
              rows="6"
              label="Prompt / Instruction"
              fullWidth
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                updateData(sessionId, name, e.target.value, image);
              }}
            />
          </Stack>
          <input type="file" id="imageCapture" accept="image/*" capture="environment" onChange={async (evt) => {
            const file = evt.target.files[0];
            const base64 = await convertBase64(file);
            setImage(base64);
            updateData(sessionId, name, prompt, base64);
          }} />
          <Button onClick={async () => {
            setDisplayMode("QR");
          }}>Upload from your mobile</Button>
          <Stack direction="row">
            <RagSection setRAG={setRAG}></RagSection>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={2} className="footer">
            <Fab onClick={() => {
              setTranscripts([]);
              call(name, prompt, rag);
              setIsCalling(true);
            }}>
              <CallIcon />
            </Fab>

            <PromptTemplate args={{ setPrompt }} />
            <Fab onClick={() => setIsSetting(true)}><SettingsIcon /></Fab>
          </Stack>
        </Paper>
        {displayMode == "test" && <Paper className="halfpage" elevation="3">

          <TextUI args={{ setUserPrompt, setAnswer, callLLM, prompt, userPrompt, image, setImage, history, setHistory, setImage, answer, rag }} />
          <Button onClick={() => {
            setDisplayMode("info")
          }} className="corner">Show prompt intructions</Button>
        </Paper>}
        {displayMode == "info" && showInstruction()}
      </Stack>

      {/* Modal for calling interaction */}
      <Modal open={isCalling}>
        <CallUI args={{ prompt, transcripts, currentMessage, sentiment, setIsCalling, rag }} />
      </Modal>

      <Modal open={displayMode == "QR"}>
        <ShowQR />
      </Modal>

      {uploadMode && <Modal open={true}>
        <Stack className="overlay"><Button onClick={() => {
          document.getElementById("imageCapture").click();
        }}>Take a photo</Button>
          {image && <img style={{ height: "10vh", width: "10vw" }} src={image} />}

          <Button onClick={() => { window.close() }}>Close</Button>
        </Stack>
      </Modal>
      }

      <Modal open={isSetting}>
        <SettingUI args={{ setIsSetting, setUserlist }} />
      </Modal>
      {!sessionId ? <Modal open={true}><Login /></Modal> : ""}
    </div>
  );
}
