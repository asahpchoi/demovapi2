import * as React from "react";
import selected from "../images/selected.svg";
import unselected from "../images/unselected.svg";
import openai from "../images/openai.png";
import mistral from "../images/mistral.png";
import minimax from "../images/minimax.jpeg";
import uploadimage from "../images/uploadimage.svg"
import documentIcon from "../images/document.svg"
import quote from "../images/quote.svg"
import untoggled from "../images/untoggled.svg"
import toggled from "../images/toggled.svg"
import email from "../images/email.svg"

const icons = {
  openai: openai,
  mistral: mistral,
  minimax: minimax,
}

export function MainPrompt({ setDisplayMode, prompt, setPrompt, model, setModel, models, onOpenBot }) {
  const [isRag, setIsRag] = React.useState(false);
  const [text, setText] = React.useState("");
  const [isToggled, setIsToggled] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState(null);
  const enableButton = !!text && text.length > 0;

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
    fontSize: "14px",
  }

  return (
    <div className="flex flex-col px-9 pb-9 w-1/2">
      <div className="text-left text-2xl font-bold text-neutral-800">
        Set up your agent bot:
      </div>
      <div className="text-left mt-9 text-xl font-bold text-neutral-800 max-md:max-w-full">
        Enter prompt below:
      </div>
      <div className="flex flex-col h-[400px] justify-between p-2 mt-4 bg-white rounded-lg border-2 border-orange-500 border-solid max-md:max-w-full">
        <div className="flex flex-row flex-1 gap-2 max-md:flex-col max-md:gap-0">
          <textarea name="botPrompt" style={inputStyle} onChange={e => setText(e.target.value)} />
          <button
            style={buttonStyle}
            disabled={enableButton}
            onClick={async () => {
            }}
          >
            <div className="flex-1" onClick={onOpenBot}>
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
                onClick={() => setSelectedModel("openai")}
                className="flex gap-2 justify-center py-1 pr-3 pl-1 bg-white border-0 border-orange-500 border-solid rounded-[100px]">
                <img
                  src={selectedModel === "openai" ? selected : unselected}
                  className="shrink-0 w-5 aspect-square"
                />
                <div className="flex gap-1 justify-center my-auto">
                  <img loading="lazy" src={icons.openai} alt={`${icons.openai} icon`} className="shrink-0 aspect-square w-[18px]" />
                  <div>CHAT GPT 4.0</div>
                </div>
              </div>
              <div
                onClick={() => setSelectedModel("minimax")}
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
                onClick={() => setSelectedModel("mistral")}
                className="flex gap-2 justify-center py-1 pr-3 pl-1 whitespace-nowrap bg-white border-0 border-orange-500 border-solid rounded-[100px]">
                <img
                  src={selectedModel === "mistral" ? selected : unselected}
                  className="shrink-0 w-5 aspect-square"
                />
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
        <div onClick={() => setIsRag(prev => !prev)} className="flex gap-2 items-center pr-20 rounded max-md:flex-wrap max-md:pr-5">
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
            <div className="flex gap-1 justify-center p-2 bg-white rounded">
              <img
                src={documentIcon}
                className="shrink-0 w-5 aspect-square"
              />
              <div className="flex-1 my-auto underline">Set for Life</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/20edc38edb55de419d162ad4a214d71d710f0594cc5ca107db3c28d5ef15d759?"
                className="shrink-0 w-5 aspect-square"
              />
            </div>
            <div className="flex gap-1 justify-center p-2 bg-white rounded">
              <img
                src={documentIcon}
                className="shrink-0 w-5 aspect-square"
              />
              <div className="flex-1 my-auto underline">Health investment linked</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/20edc38edb55de419d162ad4a214d71d710f0594cc5ca107db3c28d5ef15d759?"
                className="shrink-0 w-5 aspect-square"
              />
            </div>
            <div className="flex gap-1 justify-center p-2 bg-white rounded">
              <img
                src={documentIcon}
                className="shrink-0 w-5 aspect-square"
              />
              <div className="flex-1 my-auto underline">Claim process</div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/20edc38edb55de419d162ad4a214d71d710f0594cc5ca107db3c28d5ef15d759?"
                className="shrink-0 w-5 aspect-square"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center pr-3 pl-4 mt-4 rounded max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        <img
          src={email}
        />
        <div className="self-stretch my-auto text-sm font-bold text-neutral-800">
          Agentic AI bot (email agent)
        </div>
        <div onClick={() => setIsToggled(prev => !prev)}>
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
    </div>
  );
}
