import * as React from "react";
import {
    FilledInput
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
const FileItem = ({ src, text, alt }) => (
    <div className="flex gap-5 justify-between px-2 py-2 rounded bg-stone-50">
        <div className="flex gap-1">
            <img loading="lazy" src={src} alt={alt} className="shrink-0 w-5 aspect-square" />
            <div className="my-auto">{text}</div>
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d89bee0d53fee804ad87b2cccf2b6d70465b44bc4fb312abf57535a233c953b4?apiKey=aef2252b7f4e44588501764630aaa53c&" alt="Delete icon" className="shrink-0 my-auto w-4 aspect-square" />
    </div>
);

export const MainPrompt = ({ setDisplayMode, prompt, setPrompt, model, setModel, models }) => (
    <div className="flex flex-col self-stretch  bg-fwd-50">
        <header className="flex gap-5 justify-between px-5 w-full font-bold max-md:flex-wrap max-md:max-w-full">
            <h1 className="text-xl text-neutral-800">Enter prompt below:</h1>
            <div className="text-base text-right text-orange-500" onClick={() => {
                setDisplayMode("info")
            }}>Show instructions</div>
        </header>
        <section className="flex flex-col justify-between p-2 mt-4 w-full bg-white rounded-lg border-2 border-orange-500 border-solid max-md:max-w-full">
            <div className="max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <article className="flex flex-col w-[71%] max-md:ml-0 max-md:w-full">
                        <p className="grow pt-2.5 pb-6 text-sm leading-5 font-[450] text-neutral-800 max-md:mt-3">
                            <FilledInput value={prompt} className="w-full h-300" rows={5} multiline
                                onChange={(e) => {
                                    setPrompt(e.target.value)
                                }} />
                        </p>
                    </article>
                    <aside className="flex flex-col ml-5 w-[29%] max-md:ml-0 max-md:w-full">
                        <div
                            className="justify-center px-4 py-3 w-full text-base font-bold text-white bg-orange-500 rounded max-md:mt-3"
                            tabIndex={0}
                            role="button"
                            onClick={() => {
                                setDisplayMode("test")
                            }}
                        >
                            Start conversation
                        </div>
                    </aside>
                </div>
            </div>
            <nav className="flex gap-4 pr-20 max-md:flex-wrap max-md:pr-5">
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
                    /*[
                        {
                            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac71fffcb200fe1e860cbe039477e0862bafd922032ad0187351a9b4170b17ef?apiKey=aef2252b7f4e44588501764630aaa53c&",
                            text: "CHAT GPT 4.0",
                            alt: "chat gpt logo",
                            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/086775b7b0b7bc47c122f67266082f3674ff7b85980ed246713856851768e9ff?apiKey=aef2252b7f4e44588501764630aaa53c&"
                        },
                        {
                            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/369250538ec0daff0bcb5eb4209f9a2258c8ca46f76beb4927f7a218fb5d166a?apiKey=aef2252b7f4e44588501764630aaa53c&",
                            text: "Claude",
                            alt: "Claude logo",
                            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/03166db05c09845c3859fa9e81aa6cfa8d2c0f7f39121d7817929f087dafbe44?apiKey=aef2252b7f4e44588501764630aaa53c&"
                        },
                        {
                            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/369250538ec0daff0bcb5eb4209f9a2258c8ca46f76beb4927f7a218fb5d166a?apiKey=aef2252b7f4e44588501764630aaa53c&",
                            text: "Llama",
                            alt: "Llama logo",
                            icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dc8423ca025584be3063fa2cc1efc06869a3cd251d9a6959fc91543988450e60?apiKey=aef2252b7f4e44588501764630aaa53c&"
                        }
                    ]*/
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
                <div className="flex-1 my-auto max-md:max-w-full">Select RAG files (Optional):{" "}</div>
            </div>
            <div className="flex flex-col justify-center p-2 mt-4 text-xs bg-white rounded-lg border border-orange-300 border-dashed max-md:max-w-full">
                <div className="flex gap-2 max-md:flex-wrap">
                    {[
                        {
                            src: "://b.io/ext_10-",
                            text: "Set for Life",
                            alt: "Document icon"
                        },
                        {
                            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fb090e3bd65dba2912f90354fb3fcfcccb3fef19bfb7cf5c2aede422ae8f04fc?apiKey=aef2252b7f4e44588501764630aaa53c&",
                            text: "Health investment linked",
                            alt: "Document icon"
                        },
                        {
                            src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fb090e3bd65dba2912f90354fb3fcfcccb3fef19bfb7cf5c2aede422ae8f04fc?apiKey=aef2252b7f4e44588501764630aaa53c&",
                            text: "Claim process",
                            alt: "Document icon"
                        }
                    ].map((file, index) => (
                        <FileItem key={index} src={file.src} text={file.text} alt={file.alt} />
                    ))}
                </div>
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/41974e7c4d87a3dd1178c8497b64feaf55a785d88226ff67ee61d709e9c1db74?apiKey=aef2252b7f4e44588501764630aaa53c&" alt="Add more icon" className="self-center mt-4 w-6 aspect-square" />
            </div>
        </section>
    </div>
);
