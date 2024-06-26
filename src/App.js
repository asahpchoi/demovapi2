import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Stack,
  MenuItem,
  Select
} from "@mui/material";
import person from "./images/person.svg"
import { MainPrompt } from "./ui/MainPrompt.js";
import UserPrompt from "./ui/UserPrompt.js";
import { call, setCallback, convertBase64, resizeBase64Img } from "./libs/util.js";

import { updateData, getUser, getUsers } from "./libs/state.mjs";
import "./App.css";
import { CallUI } from "./ui/CallUI.js";

import { SettingUI } from "./ui/SettingUI.js";

import { Login } from "./ui/Login.js";

import { ShowQR } from "./ui/ShowQR.js";
import { ShowInstructions } from "./ui/ShowInstructions.js";


import bg from "./images/background.svg"
import { Result } from "./ui/Result.js";
import CloseIcon from '@mui/icons-material/Close';
import { Loading } from "./ui/Loading.js";



export default function App() {
  /// State variables for managing various application states
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [name, setName] = useState();
  const [userlist, setUserlist] = useState([]);
  const [image, setImage] = useState(null);
  const [transcripts, setTranscripts] = useState([])
  const [currentMessage, setCurrentMessage] = useState("");
  const [displayMode, setDisplayMode] = useState("info");
  const [rag, setRAG] = useState("");

  // Main prompt
  const [prompt, setPrompt] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [model, setModel] = useState("azure");
  const [useTool, setUseTool] = useState(false);

  const [showLandingPlaceHolder, setShowLandingPlaceHolder] = useState(true);
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
      const params = new URLSearchParams(document.location.search);
      const sid = params.get("sid");

      if (params.get("upload")) {
        setDisplayMode("upload")
      }
      if (false) {
        console.log("ci", process.env.CI)
        while (window.prompt('Enter Password') !== "fwdstrategy2024") {

        }
      }




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


      setUserlist(userl.sort(
        (a, b) => {
          const nameA = a.username.toUpperCase(); // ignore upper and lowercase
          const nameB = b.username.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        }
      ));
      setLoading(false); // Set loading to false once data is fetched



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

  const showInstructionsStyle = showInstructions ? {} : { left: "-50vw" };
  const landingPlaceholderStyle = showLandingPlaceHolder ? {} : { width: "0px" };

  const onToggleInstructions = () => {
    setShowInstructions(v => !v);
    setShowLandingPlaceHolder(v => !v);
  }

  function logoAction() {
    if (window.prompt('password') !== '2024') return
    if (window.confirm("Make a call?")) {
      setTranscripts([]);
      call(name, prompt, rag);
      setDisplayMode("call")
    }
    else if (window.confirm("update config?")) {
      setDisplayMode("setting")
    }
  }

  function ModalTemplate({ isOpen, component, refresh, isHideClose }) {
    return <Modal open={isOpen} >

      <Stack className="overlay bg" justifyContent="center"
        alignItems="center"
        style={{ backgroundImage: `url(${bg}` }}>
        {!isHideClose &&
          <CloseIcon
            className="fixed top-0  right-0 m-5"
            onClick={async () => {

              refresh ? window.location.reload() : setDisplayMode("test");
              const params = new URLSearchParams(document.location.search);
              const sid = params.get("sid");

              const data = await getUser(sid);
              if (data) {
                setName(data[0].username);
                setPrompt(data[0].systemPrompt);
                setImage(data[0].photo)

              }
            }}>

          </CloseIcon>
        }
        {component}

      </Stack>
    </Modal>
  }

  return (
    <div className="App">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}>
        <div className="p-9 flex flex-row justify-center">
          <div className="flex gap-4 justify-center text-base font-bold text-neutral-800 max-md:ml-2.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5eccd0cf9d1dbad8df1ed9b5b5532b98d226c847c16bafd04c30b8477fba72b0?"
              className="shrink-0 max-w-full aspect-[2.56] w-[108px]"
              onClick={logoAction}
            />
            <div className="self-center">FWD Gen AI build your bot</div>
          </div>
          <div className="flex flex-1 gap-2 justify-end self-end text-sm whitespace-nowrap">
            <div className="self-end">
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
            </div>
            <img
              loading="lazy"
              src={person} alt="Notification icon"
              className="shrink-0 w-10 aspect-square"
            />
          </div>
        </div>
        <div className="flex flex-1 relative">
          <div style={landingPlaceholderStyle} className="landing-instrustions-placeholder" >
          </div>
          <ShowInstructions style={showInstructionsStyle} onClose={onToggleInstructions} />
          <MainPrompt
            isShowInstructions={showInstructions}
            setPrompt={setPrompt}
            onOpenBot={onToggleInstructions}
            onPressModel={(model) => setModel(model)}
            onPressShowInstructions={onToggleInstructions}
            setRAG={setRAG}
            setUseTool={setUseTool}

            setDisplayMode={setDisplayMode}
            sessionId={sessionId}
            prompt={prompt}
          />
        </div>
      </div>
      <UserPrompt onEndSession={() => setDisplayMode("result")} model={model} useTool={useTool} rag={rag} prompt={prompt} setDisplayMode={setDisplayMode} image={image} />

      <ModalTemplate isOpen={!sessionId} component={<Login />} />
      <ModalTemplate isOpen={displayMode === "upload"} component={<Stack ><Button onClick={() => {
        document.getElementById("imageCapture").click();
      }} variant="contained" fullWidth>Take a photo</Button>
        {image && <>
          <img style={{ width: '60vw' }} src={image} alt="photo" />
          <div>Once the picture is taken, you can close the QR code on the desktop.</div>
        </>}

      </Stack>} />
      <ModalTemplate isOpen={displayMode === "call"} component={<CallUI args={{ prompt, transcripts, currentMessage }} />} refresh={true} />
      <ModalTemplate isOpen={displayMode === "QR"} component={<ShowQR />} />
      <ModalTemplate isOpen={displayMode === "setting"} component={<SettingUI args={{ setUserlist }} />} />

      <ModalTemplate isOpen={displayMode === 'result'} isHideClose component={<Result result={result} userlist={userlist} sessionId={sessionId} />} />

      {loading && <Loading />}
      <input type="file" id="imageCapture" accept="image/*" capture="environment"
        className="hidden"
        onChange={async (evt) => {
          const file = evt.target.files[0];
          const base64 = await convertBase64(file);
          const resizeBase64 = await resizeBase64Img(base64);
          //console.log({base64, resizeBase64})
          setImage(resizeBase64);
          updateData(sessionId, name, prompt, resizeBase64);
        }} />

    </div >
  );
}
