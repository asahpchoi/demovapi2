import minimax from "../images/minimax.jpeg";
import mistral from "../images/mistral.png"
import openai from "../images/openai.png"

export  function LLMIcon(args) {    
    return args.name == 'azure'?<img src={openai} className="h-10 w-10"/>:
    args.name == 'groq'?<img src={mistral} className="h-10 w-10"/>:
    args.name == 'minimax'?<img src={minimax} className="h-10 w-10"/>:''
}