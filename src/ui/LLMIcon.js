import minimax from "../images/minimax.jpeg";
import mistral from "../images/mistral.png"
import openai from "../images/openai.png"
import user from "../images/user.jpg";

export function LLMIcon(args) {
  const iconStye = {
    width: "40px",
    height: "40px",
  }

  return args.name === 'azure' ? <img src={openai} style={iconStye} /> :
    args.name === 'groq' ? <img src={mistral} style={iconStye} /> :
      args.name === 'minimax' ? <img src={minimax} style={iconStye} /> :
        args.name === 'user' ? <img src={user} style={iconStye} /> : ''
}
