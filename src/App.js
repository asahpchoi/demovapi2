import React, { useState, useEffect } from "react";
import {
  Button,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Toolbar,
  Typography,
  CircularProgress,
  Radio, RadioGroup, FormControlLabel,
  FilledInput
} from "@mui/material";

import { call, setCallback, convertBase64 } from "./libs/util.js";
import { callLLM, checkSentiment } from "./libs/llm.mjs";
import { updateData, getUser, getUsers } from "./libs/state.mjs";
import "./App.css";
import { CallUI } from "./ui/CallUI.js";
import { TextUI } from "./ui/TextUI.js";
import { SettingUI } from "./ui/SettingUI.js";
import Paper from '@mui/material/Paper';
import { RagSection } from "./ui/RagSection.js";
import { Login } from "./ui/Login.js";
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import logo from "./images/logo.svg";
import { ShowQR } from "./ui/ShowQR.js";
import { ShowInstructions } from "./ui/ShowInstructions.js";
import HelpIcon from '@mui/icons-material/Help';
import { LLMIcon } from "./ui/LLMIcon";
import InputAdornment from '@mui/material/InputAdornment';
import bg from "./images/background.svg"
import { Result } from "./ui/Result.js";
import CloseIcon from '@mui/icons-material/Close';


export default function App() {
  /// State variables for managing various application states
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState(null);


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

  const [displayMode, setDisplayMode] = useState("info");
  const [rag, setRAG] = useState("");
  const [model, setModel] = useState("azure");
  const models = [
    { name: "openai", model: "azure" },
    { name: "minimax", model: "minimax" },
    { name: "mistral", model: "groq" },
  ]
  const [result, setResult] = useState({
    improvement: `Consider starting the conversation with a friendly greeting, such as "Good morning/afternoon, thank you for taking the time to meet with me today. I’m excited to discuss your insurance needs.”`,
    nexttime: `Hi, thank you for coming in today. I’m looking forward to learning more about your insurance needs and how we can help you.`,
    donewell: 'well done statement',
    notdonewell: `not donewell`,
    score: 78,
  });


  // useEffect hook to initialize data on component mount
  useEffect(() => {
    async function init() {
      if (false) {
        console.log("ci", process.env.CI)
        while (window.prompt('Enter Password') != "fwdstrategy2024") {

        }
      }
      const params = new URLSearchParams(document.location.search);
      const sid = params.get("sid");


      if (sid) {
        const data = await getUser(sid);
        if (data) {
          setName(data[0].username);
          setPrompt(data[0].systemPrompt);
          setImage(data[0].photo)
          setSessionId(sid);
        }


      }
      const userl = await getUsers();
      setUserlist(userl);
      setLoading(false); // Set loading to false once data is fetched

      if (params.get("upload")) {
        setDisplayMode("upload")
      }

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
        //const sentimentReply = await checkSentiment(JSON.stringify(transcripts));
        //setSentiment(sentimentReply)
      }
    }
  }

  function openImageCapture() {
    document.getElementById("imageCapture").click();
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

  function ShowLLMs() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return <div>
      <Button onClick={handleClick}>
        Change Model
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
          <div className="flex" direction="row">
            <div className="grow"></div>
            <RadioGroup
              row
              className="p-1"
              defaultValue={model}
              onChange={(e) => {
                setModel(e.target.value);

              }}
            >
              {
                models.map(m => <>
                  <LLMIcon name={m.model} className="p-3" />
                  <FormControlLabel value={m.model} control={<Radio className="p-5" />} label={m.name} />
                </>)
              }

            </RadioGroup>
            <div className="grow"></div>
          </div>
        </Box>
      </Popper>
    </div>
  }

  function logoAction() {
    if (window.prompt('password') != '2024') return
    if (window.confirm("Make a call?")) {
      setTranscripts([]);
      call(name, prompt, rag);
      setDisplayMode("call")
    }
    else if (window.confirm("update config?")) {
      setDisplayMode("setting")
    }
  }

  function ModalTemplate({ isOpen, component }) {
    return <Modal open={isOpen} >

      <Stack className="overlay bg" justifyContent="center"
        alignItems="center"
        style={{ backgroundImage: `url(${bg}` }}>
        <CloseIcon
          className="fixed top-0  right-0 m-5"
          onClick={() => {
            setDisplayMode("test")
          }}>

        </CloseIcon>
        {component}

      </Stack>
    </Modal>
  }

  return (
    <div className="App">

      {/* Main card for prompt and role selection */}
      <Stack direction={{ xs: 'column', sm: 'row' }}  >
        {displayMode == "info" && <ShowInstructions setDisplayMode={setDisplayMode} />}
        <div className="w-6/12 bg p-3"
          style={{ backgroundImage: `url(${bg}` }}
        >
          <div className="flex h-15">
            <img src={logo} className="w-30 " onClick={logoAction} />
            <div className="p-5 decoration-solid">FWD Gen AI build your bot</div>
            <div className="flex-grow"></div>
            <div className="p-5 decoration-solid">FWD GenAI profile</div>
            <Select
              onChange={(event) => {
                const id = event.target.value;
                window.location.replace(`?sid=${id}`);
              }}
              value={sessionId}
              className="m-1"
            >
              {userlist.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </div>

          <Stack spacing={2} className=" ">
            <div className="flex ">
              <div className="text-xl font-bold text-left flex-grow">Setup your agent bot</div>
              <HelpIcon onClick={() => {
                setDisplayMode("info")
              }}> </HelpIcon>
            </div>
            <FilledInput
              className=" "
              multiline
              rows="5"
              label="Prompt / Instruction"
              fullWidth
              style={{ backgroundColor: 'white' }}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                updateData(sessionId, name, e.target.value, image);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    aria-label=""
                    onClick={() => { setDisplayMode("test"); window.scrollTo(0, document.body.scrollHeight); }}
                    onMouseDown={() => { setDisplayMode("test"); window.scrollTo(0, document.body.scrollHeight); }}
                    edge="end"
                  >
                    Test the bot
                  </Button>
                </InputAdornment>
              }
            />
            <ShowLLMs />


          </Stack>
          <input type="file" id="imageCapture" accept="image/*" capture="environment"
            className="hidden"
            onChange={async (evt) => {
              const file = evt.target.files[0];
              const base64 = await convertBase64(file);
              setImage(base64);
              updateData(sessionId, name, prompt, base64);
            }} />
          <Button onClick={() => {
            setDisplayMode("rag")
          }}>RAG</Button>
        </div>
        {displayMode == "test" && <div className="w-6/12 bg-fwd-100"  >
          <TextUI args={{
            setUserPrompt, setAnswer, callLLM, prompt,
            userPrompt, image, setImage, history,
            setHistory, setImage, answer, rag,
            model, setDisplayMode, openImageCapture, setResult
          }} />

        </div>}
      </Stack>
      <ModalTemplate isOpen={!sessionId} component={<Login />} />
      <ModalTemplate isOpen={displayMode == "upload"} component={<Stack ><Button onClick={() => {
        document.getElementById("imageCapture").click();
      }}>Take a photo</Button>
        {image && <img style={{ height: "10vh", width: "10vw" }} src={image} />}

      </Stack>} />
      <ModalTemplate isOpen={displayMode == "call"} component={<CallUI args={{ prompt, transcripts, currentMessage, sentiment, rag }} />} />
      <ModalTemplate isOpen={displayMode == "QR"} component={<ShowQR />} />
      <ModalTemplate isOpen={displayMode == "setting"} component={<SettingUI args={{ setUserlist }} />} />
      <ModalTemplate isOpen={displayMode == 'result'} component={<Result result={result} />} />
      <ModalTemplate isOpen={displayMode == 'rag'} component={<RagSection setRAG={setRAG} setDisplayMode={setDisplayMode} />} />
    </div >
  );
}
