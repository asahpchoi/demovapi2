import {
    Stack,
} from "@mui/material";
import Markdown from 'react-markdown';
 

export const Chatbot = ({ LLMIcon, history, answer, model  }) => {
    return <div id="chatbox" className="" style={{ overflow: 'auto', textAlign: "left" }}>
        <Stack className="m-3 p-2  " style={{ height: '80vh' }}>
            {history.map((h,i) => {
                const data = h.content[0].text
                return <Stack direction="row" className="pt-2" key={i}>
                    {h.model ? <LLMIcon name={h.model} /> : <LLMIcon name="user" />}
                    <Markdown className="pl-2 pt-2">{data}</Markdown>
                </Stack>
            })}

            {answer && <Stack direction="row" className="pt-2">
                <LLMIcon name={model} ></LLMIcon>
                <Markdown className="pl-2 pt-2">{answer}</Markdown>
            </Stack>}
           
        </Stack>
    </div>
}