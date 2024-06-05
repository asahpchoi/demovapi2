import {
  Stack,
  Checkbox
} from "@mui/material";
import { useState } from "react";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import MoodIcon from '@mui/icons-material/Mood';
import { checkSentiment } from "../libs/llm.mjs";
import { Chatbot } from "./Chatbot";
import { Loading } from "./Loading";
import DeleteIcon from '@mui/icons-material/Delete';
import { callLLM } from "../libs/llm.mjs";

export const TextUI = (props) => {
  const {
    prompt, image,
    rag, onEndSession,
    setDisplayMode, model, openImageCapture, setResult, useTool } = props

  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);
  const [userPrompt, setUserPrompt] = useState("");
  //const [useTool, setUseTool] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const promptStyle = {
    backgroundColor: "white",
    borderRadius: "40px",
    border: "1px solid #DBDFE1",
    padding: "10px 12px 10px 12px",
    display: "flex",
    alignItems: "center",
  }

  const promptInputStyle = {
    outline: "none",
    flexGrow: 1,
    fontSize: "16px",
  }

  const endSessionButtonStyle = {
    zIndex: 3,
    position: "absolute",
    top: "24px",
    right: "24px",
    padding: "4px 4px 4px 12px",
    display: 'flex',
    borderRadius: "99px",
    backgroundColor: "rgba(255, 236, 222, 1)",
    fontSize: "14px",
    alignItems: "center",
  }


  const actions = [
    { icon: <CameraAltIcon onClick={openImageCapture} />, name: 'Take photo' },
    {
      icon: <QrCodeScannerIcon onClick={() => {
        setDisplayMode("QR");
      }

      } />, name: 'use mobile to take photo'
    },
    {
      icon: <Checkbox onClick={() => {
        setUseTool(!useTool);
      }}></Checkbox>, name: 'use tool'
    },
    {
      icon: <MoodIcon onClick={showRating}>
      </MoodIcon>, name: 'rating'
    },
    {
      icon: <DeleteIcon onClick={() => { setHistory([]) }} />
      , name: "remove history"
    }
  ];

  async function showRating() {
    const data = history.map(h => `${h.role}: ${h.content}`).join();
    setIsLoading(true)
    const scoring = await checkSentiment(data);
    setDisplayMode("result")
    setIsLoading(false)
    setResult(scoring)
    //setSentiment(sentimentReply)
  }

  async function handleSubmit() {
    var answerPart = '';
    history.push(
      {
        role: "user",
        content:
          [
            {
              type: "text",
              text: userPrompt
            }
          ]
      })
    setUserPrompt("");
    setAnswer("")
    setIsLoading(true);
    const chatbox = document.getElementById("chatbox");
    chatbox.scrollTop = 10000;

    await callLLM(prompt, userPrompt, image,
      (data, fin, toolCalls) => {
        if (data) {
          setIsLoading(false)
          answerPart += data;
          setAnswer(answerPart)
        }
        if (fin) {
          history.push({
            role: "assistant",
            content:
              [
                {
                  type: "text",
                  text: answerPart
                }
              ],
            model: model

          })
          console.log({ toolCalls })
          setHistory([...history]);
          setAnswer("");
        }
        const chatbox = document.getElementById("chatbox");
        chatbox.scrollTop = 10000;

      }, history, rag, model, useTool);
  }

  function convertMessages(ms) {
    return ms.map(
      m => {
        return {
          role: m.role,
          content: m.content[0].text
        }
      }
    )
  }

  return (
    <Stack className="flex h-screen relative w-full">
      <button style={endSessionButtonStyle} onClick={onEndSession}>
        End the session
        <svg className="ml-1" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4999 8H8.5C8.224 8 8 8.224 8 8.5V15.5C8 15.776 8.224 16 8.5 16H15.4999C15.7759 16 15.9999 15.776 15.9999 15.5V8.5C15.9999 8.224 15.7759 8 15.4999 8Z" fill="#B30909" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" fill="#B30909" />
        </svg>
      </button>

      <Stack className="absolute top-0 pb-20 h-screen w-full">
        <Chatbot history={history} answer={answer} model={model} />
        {/* {image && <div> */}
        {/*   <ImageControl image={image} setImage={setImage} /> */}
        {/* </div>} */}
      </Stack>

      <div className="p-3 absolute bottom-0 w-full" style={{ backgroundColor: "white" }}>
        <div style={promptStyle} >
          <div className="mr-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1245 10.463C17.38 10.02 17.9465 9.86854 18.3895 10.1235C18.8325 10.3795 18.9845 10.946 18.7285 11.3895C18.4725 11.832 17.906 11.984 17.4635 11.728C17.0205 11.4725 16.8685 10.906 17.1245 10.463ZM20 18.046H4L4.0005 8.7435H8.6935L9.662 6H14.366L15.2385 8.7435H20V18.046ZM20.5 6.7435H16.7705L16.183 5.0835C15.9975 4.4415 15.41 4 14.742 4H9.286C8.618 4 8.0305 4.4415 7.845 5.0835L7.258 6.7435H3.5005C2.6715 6.7435 2.0005 7.415 2.0005 8.2435L2 18.546C2 19.3745 2.6715 20.046 3.5 20.046H20.5C21.3285 20.046 22 19.3745 22 18.546V8.2435C22 7.415 21.3285 6.7435 20.5 6.7435ZM11.9681 14.9353C10.8826 14.9353 10.0001 14.0523 10.0001 12.9668C10.0001 11.8818 10.8826 10.9998 11.9681 10.9998C13.0531 10.9998 13.9361 11.8818 13.9361 12.9668C13.9361 14.0523 13.0531 14.9353 11.9681 14.9353ZM11.9451 8.99976C9.76962 8.99976 8.00012 10.7693 8.00012 12.9443C8.00012 15.1203 9.76962 16.8898 11.9451 16.8898C14.1201 16.8898 15.8901 15.1203 15.8901 12.9443C15.8901 10.7693 14.1201 8.99976 11.9451 8.99976Z" fill="black" />
            </svg>
          </div>
          <input
            style={promptInputStyle}
            placeholder="Send a message or upload an image, document"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            onKeyDown={async (e) => {
              if (e.keyCode === 13) {
                handleSubmit();
              }
            }}
          />
          <div className="ml-1" onClick={e => { handleSubmit(); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#E87722" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1537 10.7642L12.056 5.6665L6.95902 10.7642C6.56835 11.1545 6.56835 11.7878 6.95902 12.1782L7.19468 12.4138L11.3893 8.21917V17.6095C11.3893 17.7935 11.5383 17.9428 11.7227 17.9428H12.3893C12.5733 17.9428 12.7227 17.7935 12.7227 17.6095V8.21884L16.918 12.4138L17.1537 12.1782C17.544 11.7878 17.544 11.1545 17.1537 10.7642Z" fill="#E87722" />
            </svg>
          </div>
        </div>
      </div>
      {
        isLoading && <Loading>

          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>

        </Loading>
      }

    </Stack >
  )
}
