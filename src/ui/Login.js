
import {
  Button,
  Stack,
  TextField,

} from "@mui/material";
import { useState } from "react";
import { getID, updateData } from "../libs/state.mjs";
import bg from "../images/background.svg"
import logo from "../images/logo.svg";
import listen from "../images/listen.svg";


export const Login = ({ args }) => {
  const [inputName, setInputName] = useState("");
  const [isLoginInputFocus, setIsLoginInputFocus] = useState(false);

  const enableButton = inputName.length > 0;

  const loginInputStyle = {
    width: "480px",
    height: "52px",
    borderRadius: "8px",
    border: isLoginInputFocus ? "2px solid #E87722" : "2px solid #fff",
    display: "flex",
    padding: "4px 4px 4px 8px",
    margin: "auto",
    backgroundColor: "#fff",
  }

  const loginButtonStyle = {
    alignItems: "center",
    display: "flex",
    padding: "0, 16px, 0, 16px",
    borderRadius: "4px",
    backgroundColor: enableButton ? "#E87722" : "#F3BB90",
    color: "#fff",
    padding: "0 16px 0 16px",
  }

  const inputStyle = {
    padding: "0",
    flexGrow: "1",
    outline: "none",
  }

  return <Stack className="flex justify-center overlay bg" style={{ backgroundImage: `url(${bg}`, backgroundColor: "#F8F9F9" }}>

    <div className="absolute top-0 left-0 flex align-middle">
      <img src={logo} className="w-40 ml-7" alt="logo" />
      <h2 className="p-10 font-bold">FWD Gen AI build your bot</h2>
    </div>
    <div className="flex flex-col text-center" style={{ marginTop: -200 }}>
      <img src={listen} className="h-64 -mb-20" alt="listen" />
      <div className="text-3xl w-auto font-bold">Hello, Nice to have you here.</div>
      <div className="text-5xl font-bold py-6">What is your name?</div>
      <div style={loginInputStyle}>
        <input
          onFocus={() => setIsLoginInputFocus(true)}
          onBlur={() => setIsLoginInputFocus(false)}
          label="Name"
          style={inputStyle}
          onChange={(e) => setInputName(e.target.value)}
          onKeyDown={async (e) => {
            if (e.keyCode === 13) {
              if (inputName) {
                const sid = await getID();
                await updateData(sid, inputName);
                console.log({
                  sid, inputName
                })
                window.location.replace("?sid=" + sid);
              }
            }
          }}
        />
        <button
          style={loginButtonStyle}
          disabled={!enableButton}
          onClick={async () => {
            //setName(inputName);
            if (inputName) {
              const sid = await getID();
              await updateData(sid, inputName);
              console.log({
                sid, inputName
              })
              window.location.replace("?sid=" + sid);
            }
          }}
        >
          <svg style={{ marginRight: "4px" }} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.98525 3.32934L7.71975 3.59447L12.4391 8.31347H1.5V9.81347H12.4399L7.72013 14.5336L7.98525 14.7983C8.42438 15.2378 9.13688 15.2378 9.57638 14.7983L15.3105 9.06384L9.576 3.32934C9.13688 2.89022 8.42438 2.89022 7.98525 3.32934Z" fill="white" />
          </svg>
          Start
        </button>
      </div>
    </div>

  </Stack>
}
