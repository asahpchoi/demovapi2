import minimax from "../images/minimax.jpeg";
import mistral from "../images/mistral.png"
import openai from "../images/openai.png"
import user from "../images/user.jpg";

export  function LLMIcon(args) {    
    return args.name === 'azure'?<img src={openai} className="h-10 w-10 m-2 "/>:
    args.name === 'groq'?<img src={mistral} className="h-10 w-10 m-2"/>:
    args.name === 'minimax'?<img src={minimax} className="h-10 w-10 m-2"/>:
    args.name === 'user'?<img src={user} className="h-10 w-10 m-2"/>:''
}