import React, { useState, useEffect } from "react";
import {
  Button,
  MenuItem,
  Modal,
  Select,
  Stack,
  Radio, RadioGroup, FormControlLabel,

} from "@mui/material";
import { MainPrompt } from "./ui/MainPrompt.js";
import { call, setCallback, convertBase64 } from "./libs/util.js";
import { callLLM } from "./libs/llm.mjs";
import { updateData, getUser, getUsers } from "./libs/state.mjs";
import "./App.css";
import { CallUI } from "./ui/CallUI.js";
import { TextUI } from "./ui/TextUI.js";
import { SettingUI } from "./ui/SettingUI.js";
import { RagSection } from "./ui/RagSection.js";
import { Login } from "./ui/Login.js";
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import logo from "./images/logo.svg";
import { ShowQR } from "./ui/ShowQR.js";
import { ShowInstructions } from "./ui/ShowInstructions.js";
import { LLMIcon } from "./ui/LLMIcon";

import bg from "./images/background.svg"
import { Result } from "./ui/Result.js";
import CloseIcon from '@mui/icons-material/Close';
import { Loading } from "./ui/Loading.js";
import { Header } from "./ui/Header.js";

export default function App() {
  /// State variables for managing various application states
  const [loading, setLoading] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [name, setName] = useState();
  const [userlist, setUserlist] = useState([]);
  const [image, setImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [transcripts, setTranscripts] = useState([])
  const [currentMessage, setCurrentMessage] = useState("");
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

  function ModalTemplate({ isOpen, component, refresh }) {
    return <Modal open={isOpen} >

      <Stack className="overlay bg" justifyContent="center"
        alignItems="center"
        style={{ backgroundImage: `url(${bg}` }}>
        <CloseIcon
          className="fixed top-0  right-0 m-5"
          onClick={() => {
            refresh ? window.location.reload() : setDisplayMode("test")
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
          <Header logoAction={logoAction} userlist={userlist} sessionId={sessionId} />

          <MainPrompt setDisplayMode={setDisplayMode} prompt={prompt} setPrompt={setPrompt}
            model={model} setModel={setModel} models={models} />


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
      <ModalTemplate isOpen={displayMode == "call"} component={<CallUI args={{ prompt, transcripts, currentMessage }} />} refresh={true} />
      <ModalTemplate isOpen={displayMode == "QR"} component={<ShowQR />} refresh={true} />
      <ModalTemplate isOpen={displayMode == "setting"} component={<SettingUI args={{ setUserlist }} />} />
      <ModalTemplate isOpen={displayMode == 'result'} component={<Result result={result} />} />
      <ModalTemplate isOpen={displayMode == 'rag'} component={<RagSection setRAG={setRAG} setDisplayMode={setDisplayMode} />} />
      {loading && <Loading />}
      <input type="file" id="imageCapture" accept="image/*" capture="environment"
        className="hidden"
        onChange={async (evt) => {
          const file = evt.target.files[0];
          const base64 = await convertBase64(file);
          setImage(base64);
          updateData(sessionId, name, prompt, base64);
        }} />
    </div >
  );
}
