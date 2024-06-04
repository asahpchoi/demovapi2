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
export const MainPrompt = ({ setDisplayMode, prompt, setPrompt, model, setModel, models }) => {
  // const enableButton = prompt.length > 0;
  const enableButton = true;
  const buttonStyle = {
    alignItems: "center",
    width: "147px",
    height: "44px",
    display: "flex",
    borderRadius: "4px",
    backgroundColor: enableButton ? "#E87722" : "#F3BB90",
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
  }

  const radioStyle = {
    width: "24px",
    height: "24px",
    borderRadius: "1000px",
    borderColor: "#E87722",
    borderWidth: "2px",
  }

  const selectedRadioStyle = {
    backgroundColor: "#E87722",
  }

  return (
    <div className="flex flex-col px-9 pb-9 max-w-[695px] max-md:px-5">
      <div className="text-left text-2xl font-bold text-neutral-800 max-md:max-w-full">
        Set up your agent bot:
      </div>
      <div className="text-left mt-9 text-xl font-bold text-neutral-800 max-md:max-w-full">
        Enter prompt below:
      </div>
      <div className="flex flex-col h-[400px] justify-between p-2 mt-4 bg-white rounded-lg border-2 border-orange-500 border-solid max-md:max-w-full">
        <div className="flex flex-row flex-1 gap-2 max-md:flex-col max-md:gap-0">
          <textarea style={inputStyle} multiple />
          <button
            style={buttonStyle}
            onClick={async () => {
            }}
          >
            <div className="flex-1">
              Open your GPT
            </div>
          </button>
        </div>
        <div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2cb397158623a09c65497ec899e1ffc3078c8c7a6c644308d076b0f3894e0d46?"
            className="w-6 aspect-square max-md:mt-10"
          />
          <div className="flex gap-3 py-3 mt-3 text-sm rounded-lg max-md:flex-wrap">
            <div className="flex gap-2 self-start px-3 font-bold rounded text-neutral-800">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/18374eb6dcc8a84497e998d43bbc955e7bef76181e4ff3251b797e8138135010?"
                className="shrink-0 aspect-[0.97] w-[29px]"
              />
              <div className="my-auto">Select LLM:</div>
            </div>
            <div className="flex flex-wrap flex-1 gap-3 content-start font-[450] text-neutral-800">
              <div className="flex gap-2 justify-center py-1 pr-3 pl-1 bg-white border-0 border-orange-500 border-solid rounded-[100px]">
                <div style={model === "openai" ? { ...radioStyle, ...selectedRadioStyle } : radioStyle} className="flex gap-1 justify-center my-auto" onClick={() => setModel("openai")} />
                <div className="flex gap-1 justify-center my-auto">
                  <img loading="lazy" src={icons.openai} alt={`${icons.openai} icon`} className="shrink-0 aspect-square w-[18px]" />
                  <div>CHAT GPT 4.0</div>
                </div>
              </div>
              <div className="flex gap-2 justify-center py-1 pr-3 pl-1 whitespace-nowrap bg-white border-0 border-orange-500 border-solid rounded-[100px]">
                <div style={model === "minimax" ? { ...radioStyle, ...selectedRadioStyle } : radioStyle} className="flex gap-1 justify-center my-auto" onClick={() => setModel("minimax")} />
                <div className="flex gap-1 justify-center my-auto">
                  <img loading="lazy" src={icons.minimax} alt={`${icons.minimax} icon`} className="shrink-0 aspect-square w-[18px]" />
                  <div>Minimax</div>
                </div>
              </div>
              <div className="flex gap-2 justify-center py-1 pr-3 pl-1 whitespace-nowrap bg-white border-0 border-orange-500 border-solid rounded-[100px]">
                <div style={model === "mistral" ? { ...radioStyle, ...selectedRadioStyle } : radioStyle} className="flex gap-1 justify-center my-auto" onClick={() => setModel("mistral")} />
                <div className="flex gap-1 justify-center my-auto">
                  <img loading="lazy" src={icons.mistral} alt={`${icons.mistral} icon`} className="shrink-0 aspect-square w-[18px]" />
                  <div>Llama</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center px-4 py-3 mt-4 text-sm font-bold rounded border-0 border-orange-300 border-solid text-neutral-800 max-md:max-w-full">
        <div className="flex gap-2 items-center pr-20 rounded max-md:flex-wrap max-md:pr-5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae4b7f3fcb1fa8d640e3d612357eace063b133fa8316a0efb79b66276ebaf2af?"
            className="shrink-0 self-stretch aspect-[0.97] w-[29px]"
          />
          <div className="self-stretch my-auto">
            Select RAG files (Optional):{" "}
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/79f6274fd0f0ef75ad579f4f61afaa456c188722f02e280e7e7fb4ad5d667f70?"
            className="shrink-0 self-stretch my-auto w-6 aspect-square"
          />
        </div>
      </div>
      <div className="flex gap-2 items-center pr-3 pl-4 mt-4 rounded max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5755ed0f9e50a3b37ef69f0f55954e4fc43d0d996ff3a40a57ea3303d8835621?"
          className="shrink-0 self-stretch aspect-[0.97] w-[29px]"
        />
        <div className="self-stretch my-auto text-sm font-bold text-neutral-800">
          Agentic AI bot (email agent)
        </div>
        <div className="flex flex-col justify-center max-w-[40px]">
          <div className="flex flex-col justify-center items-start py-1 w-full bg-white border-2 border-solid border-zinc-400 rounded-[50px]">
            <div className="shrink-0 w-3.5 h-3.5 rounded-full bg-zinc-400" />
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col self-stretch  bg-fwd-50 pl-10 pr-10">
      <header className="flex gap-5 justify-between px-5 w-full font-bold max-md:flex-wrap max-md:max-w-full">
        <h1 className="text-xl text-neutral-800">Enter prompt below:</h1>
        <div className="text-base text-right text-orange-500" ><Button onClick={() => {
          setDisplayMode("info")
        }} variant="outlined">Show instructions</Button>

        </div>
      </header>
      <section className="flex flex-col justify-between p-2 mt-4 w-full rounded-lg border-2 border-orange-500 border-solid max-md:max-w-full">
        <div className="max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <article className="flex flex-col w-full max-md:ml-0 max-md:w-full">
              <p className="grow pt-2.5 pb-6 text-sm leading-5 font-[450] text-neutral-800 max-md:mt-3">
                <FilledInput value={prompt} className="w-full h-300" rows={3} multiline
                  onChange={(e) => {
                    setPrompt(e.target.value)
                  }} />
              </p>
            </article>

          </div>
        </div>
        <nav className="flex gap-4  max-md:flex-wrap max-md:pr-5 flex-row-reverse">
          <Button className="m-1" onClick={() => {
            setDisplayMode("test")
          }} variant="outlined"> Start conversation</Button>
          <img loading="lazy" src={uploadimage} alt="Second external link" className="shrink-0 w-6 aspect-square"
            onClick={() => { setDisplayMode("upload") }} />

        </nav>
      </section>
      <section className="flex gap-3 py-3 mt-6 text-sm rounded-lg max-md:flex-wrap">
        <div className="flex gap-2 self-start px-3 font-bold rounded text-neutral-800">
          <img loading="lazy" src={quote} alt="Select LLM icon" className="shrink-0 aspect-[0.97] w-[29px]" />
          <span className="my-auto">Select LLM:</span>
        </div>
        <div className="flex flex-wrap flex-1 gap-3 content-start pr-20 font-[450] text-neutral-800">
          {

            models.map((item, index) => (
              <div
                key={index}
                className={`flex gap-2 justify-center py-1 pr-3 pl-1 ${item.model} === model
                            ? "border-2 border-orange-500 border-solid bg-stone-50"
                            : "bg-white border-0 rounded-[100px]"
                            }`}
              >

                <img loading="lazy" onClick={() => { setModel(item.model) }}
                  src={item.model === model ? selected : unselected} alt={item.alt} className="shrink-0 w-6 aspect-square" />
                <div className="flex gap-1 justify-center my-auto">
                  <img loading="lazy" src={icons[item.name]} alt={`${item.name} icon`} className="shrink-0 aspect-square w-[18px]" />
                  <div>{item.name}</div>
                </div>
              </div>
            ))}
        </div>
      </section>
      <section className="flex flex-col p-3 mt-6 w-full font-bold bg-gray-100 rounded border-0 border-orange-300 border-solid text-neutral-800 max-md:max-w-full">
        <div className="flex gap-2 justify-center text-sm bg-gray-100 rounded max-md:flex-wrap">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/11a0707ac580a78bf668163d79e441fa00442ecabcb2657b7416902ed9404e23?apiKey=aef2252b7f4e44588501764630aaa53c&" alt="Select RAG files icon" className="shrink-0 aspect-[0.97] w-[29px]" />
          <div className="flex-1 my-auto max-md:max-w-full" onClick={() => {
            setDisplayMode("rag")
          }}>Select RAG files (Optional):{" "}</div>
        </div>

      </section>
    </div>
  )
};
