import {
  Stack,
} from "@mui/material";
import Markdown from 'react-markdown';
import person from "../images/person.svg"
import { LLMIcon } from "./LLMIcon"

export const Chatbot = ({ history, answer, model }) => {
  const historyStyle = {
    padding: "16px 24px 16px 24px",
  }

  const assistantStyle = {
    background: "rgba(255, 255, 255, 0.6)",
  }

  const getStyle = (role) => {
    return role === "assistant" ? {
      ...historyStyle,
      ...assistantStyle
    } : historyStyle;
  }

  return <div id="chatbox" className="text-left h-screen overflow-scroll">
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
