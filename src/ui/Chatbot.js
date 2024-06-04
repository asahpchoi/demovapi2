import {
  Stack,
} from "@mui/material";
import Markdown from 'react-markdown';
import person from "../images/person.svg"
import { LLMIcon } from "./LLMIcon"
import aichattop from "../images/aichattop.png";

export const Chatbot = ({ history, answer, model }) => {
  const historyStyle = {
    padding: "16px 24px 16px 24px",
  }

  const assistantStyle = {
    background: "rgba(255, 255, 255, 0.6)",
  }

  const placeholderStyle = {
    marginTop: "64px",
    fontSize: "25px",
    fontWeight: "bold",
    lineHeight: "32px",
    width: "100%",
    textAlign: "center",
  }

  const getStyle = (role) => {
    return role === "assistant" ? {
      ...historyStyle,
      ...assistantStyle
    } : historyStyle;
  }

  return <div id="chatbox" className="text-left overflow-scroll w-full">
    <div style={{ width: "69px" }} className="mx-auto mt-16">
      <img src={aichattop} alt="AI Chat" width="69px" />
    </div>

    {history.length === 0 &&
      <Stack style={placeholderStyle}>
        <div>Hello! I am your financial advisor. </div>
        <div>How can I help you today?</div>
      </Stack>
    }

    {history.map((h, i) => {
      const data = h.content[0].text
      return <Stack direction="row" style={getStyle(h.role)} key={i}>
        {h.role === "user" && <img src={person} alt="person" />}
        {h.role === "assistant" && <LLMIcon name={h.model ?? "azure"} />}
        <Markdown className="pl-2 ">{data}</Markdown>
      </Stack>
    })}

    {answer && <Stack direction="row" style={{ ...historyStyle, ...assistantStyle }}>
      <LLMIcon name={model ?? "azure"} ></LLMIcon>
      <Markdown className="pl-2 ">{answer}</Markdown>
    </Stack>}

  </div>
}
