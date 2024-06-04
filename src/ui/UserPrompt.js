
import * as React from "react";
import {
  FilledInput, Button
} from "@mui/material";
import selected from "../images/selected.svg";
import unselected from "../images/unselected.svg";
import openai from "../images/openai.png";
import mistral from "../images/mistral.png";
import minimax from "../images/minimax.jpeg";
import uploadimage from "../images/uploadimage.svg"
import quote from "../images/quote.svg"
import { TextUI } from "./TextUI";

const icons = {
  openai: openai,
  mistral: mistral,
  minimax: minimax,
}
/*
const FileItem = ({ src, text, alt }) => (
    <div className="flex gap-5 justify-between px-2 py-2 rounded bg-stone-50">
        <div className="flex gap-1">
            <img loading="lazy" src={src} alt={alt} className="shrink-0 w-5 aspect-square" />
            <div className="my-auto">{text}</div>
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d89bee0d53fee804ad87b2cccf2b6d70465b44bc4fb312abf57535a233c953b4?apiKey=aef2252b7f4e44588501764630aaa53c&" alt="Delete icon" className="shrink-0 my-auto w-4 aspect-square" />
    </div>
);
*/
const UserPrompt = ({ onEndSession, prompt, setPrompt, model, setModel, models }) => {
  // const enableButton = prompt.length > 0;
  const containerStyle = {
    marginLeft: "12px",
    borderLeft: "4px solid red",
    borderImage: "linear-gradient(180deg, #E87722 9.11%, #E87722 30.93%, #FED141 57.74%, #6ECEB2 73.64%, #E87722 91.37%) 1",
    boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.45)",
    width: "50vw",
    backgroundColor: "rgba(250, 250, 250, 1)",
  }
  return (
    <div className="h-screen" style={containerStyle}>
      <TextUI prompt={prompt} model={model} onEndSession={onEndSession} />
    </div>
  );


};

export default UserPrompt;
