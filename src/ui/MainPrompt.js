import * as React from "react";
import selected from "../images/selected.svg";
import unselected from "../images/unselected.svg";
import openai from "../images/openai.png";
import mistral from "../images/mistral.png";
import minimax from "../images/minimax.jpeg";

import documentIcon from "../images/document.svg"

import untoggled from "../images/untoggled.svg"
import toggled from "../images/toggled.svg"
import email from "../images/email.svg"
import { ragdata } from "../libs/ragdata";
import { updateSystemPrompt } from "../libs/state.mjs";
import manulife from "../images/manulife.png";
import code from "../images/code.jpg";
import {

  Modal,

} from "@mui/material";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
const icons = {
  openai: openai,
  mistral: mistral,
  minimax: minimax,
}



export function MainPrompt({ setPrompt, onPressModel, onOpenBot, isShowInstructions, onPressShowInstructions, setRAG, setUseTool, setDisplayMode, sessionId, prompt }) {
  const [isRag, setIsRag] = React.useState(false);
  const [text, setText] = React.useState("");
  const [isToggled, setIsToggled] = React.useState(false);
  const [showCode, setShowCode] = React.useState(false)
  const [showPDF, setShowPDF] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState("azure");
  const [selectedFiles, setSelectedFiles] = React.useState({
    setForLife: false,
    health: false,
    claim: false,
  });
  const [promptH, setPromptH] = React.useState("400px");
  const enableButton = !!text && text.length > 0;

  const buttonStyle = {
    alignItems: "center",
    width: "147px",
    height: "44px",
    display: "flex",
    borderRadius: "4px",
    backgroundColor: "#E87722",
    color: "#fff",
    padding: "0 16px 0 16px",
    fontSize: "14px",
    fontWeight: "bold",
  }

  const inputStyle = {
    outline: "none",
    caretColor: "#E87722",
    display: "flex",
    flex: "1",
    resize: 'none',
    fontSize: "14px",
  }

  React.useEffect(() => {

    var RAG = "";
    if (selectedFiles.setForLife) {
      RAG += ragdata.setForLife.content
    }
    if (selectedFiles.health) {
      RAG += ragdata.health.content
    }
    if (selectedFiles.claim) {
      RAG += ragdata.claim.content
    }

    setRAG(RAG);
    setUseTool(isToggled);
    setPrompt(text);
    updateSystemPrompt(sessionId, text);
  }, [selectedFiles, isToggled, text])



  return (
    <div className="flex flex-col px-9 pb-9 overflow-auto" style={{ width: "50vw" }}>
      <div className="text-left text-2xl font-bold text-neutral-800">
        Set up your agent bot:
      </div>
      <div className="flex flex-row mt-9 justify-between">
        <div className="text-left ext-xl font-bold text-neutral-800 max-md:max-w-full">
          Enter prompt below:
        </div>
        {!isShowInstructions && (
          <div className="text-end text-orange-500 font-bold" onClick={() => onPressShowInstructions()}>
            <button>
              Show instructions
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between p-2 mt-4 bg-white rounded-lg border-2 border-orange-500 border-solid max-md:max-w-full"
        style={{
          height: promptH
        }}>
        <AspectRatioIcon onClick={() => {
          setPromptH(promptH !== '400px' ? '400px' : '170px')
          
        }} style={{"position": "absolute", right:50}}/>
        <div className="flex flex-row flex-1 gap-2 max-md:flex-col max-md:gap-0">
          <textarea
            name="botPrompt"
            style={inputStyle}
            onChange={e => {
              setText(e.target.value); setPrompt(e.target.value)
            }}
            value={prompt}
          />

        </div>
        <div>
          <div className="flex flex-row gap-2 text-xs font-bold text-neutral-800 max-md:flex-wrap">

            {selectedFiles.setForLife && (
              <div className="flex gap-5 px-2 py-2 rounded bg-fwd-100">
                <div className="flex flex-1 gap-1">
                  <img
                    src={documentIcon}
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="my-auto">Set for Life </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d89bee0d53fee804ad87b2cccf2b6d70465b44bc4fb312abf57535a233c953b4?"
                  className="shrink-0 my-auto w-4 aspect-square"
                  onClick={() => setSelectedFiles(prev => ({ ...prev, setForLife: false }))}
                />
              </div>
            )}
            {selectedFiles.health && (
              <div className="flex gap-0.5 justify-between px-2 py-2 rounded bg-fwd-100"

              >
                <div className="flex gap-1">
                  <img
                    src={documentIcon}
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="my-auto">Set for Health</div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/75e5f02c47074f3f38d36de4edbbd11a27acd444132daef9754f913ed2b07a72?"
                  className="shrink-0 my-auto w-4 aspect-square"
                  onClick={() => {
                    setSelectedFiles(prev => ({ ...prev, health: false }));

                  }

                  }
                />
              </div>
            )}
            {selectedFiles.claim && (
              <div className="flex gap-5 justify-between px-2 py-2 rounded bg-fwd-100"

              >
                <div className="flex gap-1">
                  <img
                    src={documentIcon}
                    className="shrink-0 w-5 aspect-square"
                  />
                  <div className="my-auto">Claim process</div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d89bee0d53fee804ad87b2cccf2b6d70465b44bc4fb312abf57535a233c953b4?"
                  className="shrink-0 my-auto w-4 aspect-square"
                  onClick={() => setSelectedFiles(prev => ({ ...prev, claim: false }))
                  }
                />
              </div>
            )}

          </div>

          <div className="flex gap-3 py-3 mt-3 text-sm rounded-lg max-md:flex-wrap">
            <div className="flex gap-2 self-start px-1 font-bold rounded text-neutral-800">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/18374eb6dcc8a84497e998d43bbc955e7bef76181e4ff3251b797e8138135010?"
                className="shrink-0 aspect-[0.97] w-[29px]"
              />
              <div className="my-auto">Select LLM:</div>
            </div>
            <div className="flex flex-wrap flex-1 gap-3 content-start font-[450] text-neutral-800">
              <div
                onClick={() => { setSelectedModel("azure"); onPressModel("azure") }}
                className="flex gap-2 justify-center py-1 pr-3 pl-1 bg-white border-0 border-orange-500 border-solid rounded-[100px]">
                <img
                  src={selectedModel === "azure" ? selected : unselected}
                  className="shrink-0 w-5 aspect-square"
                />
                <div className="flex gap-1 justify-center my-auto">
                  <img loading="lazy" src={icons.openai} alt={`${icons.openai} icon`} className="shrink-0 aspect-square w-[18px]" />
                  <div>CHAT GPT 4.0</div>
                </div>
              </div>
              <div
                onClick={() => { setSelectedModel("minimax"); onPressModel("minimax") }}
                className="flex gap-2 justify-center py-1 pr-3 pl-1 whitespace-nowrap bg-white border-0 border-orange-500 border-solid rounded-[100px]">
                <img
                  src={selectedModel === "minimax" ? selected : unselected}
                  className="shrink-0 w-5 aspect-square"
                />
                <div className="flex gap-1 justify-center my-auto">
                  <img loading="lazy" src={icons.minimax} alt={`${icons.minimax} icon`} className="shrink-0 aspect-square w-[18px]" />
                  <div>Minimax</div>
                </div>
              </div>
              <div
                onClick={() => { setSelectedModel("groq"); onPressModel("groq") }}
                className="flex gap-2 justify-center py-1 pr-3 pl-1 whitespace-nowrap bg-white border-0 border-orange-500 border-solid rounded-[100px]">
                <img
                  src={selectedModel === "groq" ? selected : unselected}
                  className="shrink-0 w-5 aspect-square"
                />
                <div className="flex gap-1 justify-center my-auto">
                  <img loading="lazy" src={icons.mistral} alt={`${icons.mistral} icon`} className="shrink-0 aspect-square w-[18px]" />
                  <div>Mistral</div>
                </div>
              </div>

            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cb397158623a09c65497ec899e1ffc3078c8c7a6c644308d076b0f3894e0d46?"
              className=" w- 6 h-[36px] aspect-square max-md:mt-10"
              onClick={() => setDisplayMode("QR")}
            />

            <button
              style={buttonStyle}

              onClick={async () => {
              }}
            >
              <div className="flex-1" onClick={isShowInstructions ? onOpenBot : undefined}>
                Open your GPT
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-4 py-3 mt-4 text-sm font-bold rounded border-0 border-orange-300 border-solid text-neutral-800 max-md:max-w-full">
        <div onClick={() => setIsRag(prev => !prev)} style={{ cursor: "pointer" }} className="flex gap-2 items-center pr-20 rounded max-md:flex-wrap max-md:pr-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae4b7f3fcb1fa8d640e3d612357eace063b133fa8316a0efb79b66276ebaf2af?"
            className="shrink-0 self-stretch aspect-[0.97] w-[29px]"
          />
          <div className="self-stretch my-auto">
            Select RAG files (Optional):{" "}
          </div>
          {isRag && (
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/322af2efe56197fee32bb9c57fdd22b8854c995217d64460c2c893db9c5b3e1e?"
              className="w-full aspect-[1.59] fill-orange-500 max-w-[16px]"
            />
          )}
          {!isRag && (
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dac67a7d7ee3479a44f3fdc9ffc09e44f38d378042714a7802b36f3a6e7b0602?"
              className="w-full aspect-[1.59] fill-orange-500 max-w-[16px]"
            />
          )}
        </div>
        {isRag && (
          <div className="flex gap-3 mt-5 self-stretch text-xs font-bold text-neutral-800 max-md:flex-wrap">
            {!selectedFiles.setForLife && (
              <div className="flex gap-1 justify-center p-2 bg-white rounded"

              >
                <img
                  src={documentIcon}
                  className="shrink-0 w-5 aspect-square"
                />
                <a className="flex-1 my-auto underline" href={ragdata.setForLife.url} target="_blank">Set for Life</a>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/20edc38edb55de419d162ad4a214d71d710f0594cc5ca107db3c28d5ef15d759?"
                  className="shrink-0 w-5 aspect-square"
                  onClick={() => {
                    setSelectedFiles(prev => ({ ...prev, setForLife: true }));
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
            {!selectedFiles.health && (
              <div
                className="flex gap-1 justify-center p-2 bg-white rounded"

              >
                <img
                  src={documentIcon}
                  className="shrink-0 w-5 aspect-square"
                />

                <a className="flex-1 my-auto underline" href={ragdata.health.url} target="_blank">Set for Health</a>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/20edc38edb55de419d162ad4a214d71d710f0594cc5ca107db3c28d5ef15d759?"
                  className="shrink-0 w-5 aspect-square"
                  onClick={() => { setSelectedFiles(prev => ({ ...prev, health: true })) }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
            {!selectedFiles.claim && (
              <div className="flex gap-1 justify-center p-2 bg-white rounded"

              >
                <img
                  src={documentIcon}
                  className="shrink-0 w-5 aspect-square"
                />
                <a className="flex-1 my-auto underline" href={ragdata.claim.url} target="_blank">Claim Process</a>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/20edc38edb55de419d162ad4a214d71d710f0594cc5ca107db3c28d5ef15d759?"
                  className="shrink-0 w-5 aspect-square"
                  onClick={() => { setSelectedFiles(prev => ({ ...prev, claim: true })) }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center pr-3 pl-4 mt-4 rounded max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <img
          src={email}
        />
        <div className="self-stretch my-auto text-sm font-bold text-neutral-800" onClick={() => {
          setShowCode(prev => !prev)

        }} style={{ cursor: "pointer" }}>
          Agentic AI bot (email agent)


        </div>
        {showCode && <img src={code} style={{ position: "absolute", right: 0, width: "30vw", }} />}
        <div onClick={() => {
          setIsToggled(prev => !prev)
          setUseTool(prev => !prev);
        }}>
          {isToggled && (
            <img
              src={toggled}
              className="shrink-0 self-stretch aspect-[0.97] w-[29px]"
            />)}
          {!isToggled && (
            <img
              src={untoggled}
              className="shrink-0 self-stretch aspect-[0.97] w-[29px]"
            />)}
        </div>

      </div>
      <div className="flex gap-2 items-center pr-3 pl-4 mt-4 rounded max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        [<div onClick={e => setShowPDF(true)}>Sample image</div>]
        <Modal open={showPDF}>
          <img src={manulife} onClick={e => {
            setShowPDF(false)
          }} style={{ position: "absolute", left: '30%', top: 0, height: '100vh' }}></img>
        </Modal>
      </div>
    </div>
  );
}
