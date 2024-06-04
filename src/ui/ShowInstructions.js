/*import { getSettings } from "../libs/state.mjs";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export const ShowInstructions = (args) => {

    const [instruction, setInstruction] = useState("")
    getSettings("instruction").then(data => {
        setInstruction(data)
    })
    return <div className="md:w-1/2 w-full pt-5 bg-fwd-100 p-5"   elevation="3">
        <div className="flex">
            <div className="text-xl font-bold text-left flex-grow">Tips for for your instructions</div>
            <CloseIcon onClick={() => {
                args.setDisplayMode("test")
            }}> </CloseIcon>
        </div>

        <pre style={{ textAlign: "left", overflow: "auto", textWrap: "wrap", margin: '2em', height: '80vh' }}>
            {instruction}
        </pre>
    </div>
}
*/
import { ViewHeadline } from "@mui/icons-material";
import * as React from "react";

function SamplePersonaPrompt({ imgSrc, title }) {
  return (
    <div className="flex gap-2 p-3 border-2 border-orange-500 border-solid rounded-[44px] " role="button" tabIndex="0">
      <img
        loading="lazy"
        src={imgSrc}
        className="shrink-0 w-6 aspect-square"
        alt=""
      />
      <div className="my-auto">{title}</div>
    </div>
  );
}

function ListItem({ title, bodies }) {
  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col justify-center self-start p-0.5">
        <div className="shrink-0 w-5 h-5 bg-white rounded border-2 border-orange-500 border-solid" />
      </div>
      <div className="flex-1">
        <p className="text-sm leading-5 font-[450] text-left text-neutral-800 max-md:max-w-full">
          {title}
        </p>
        <ul className="list-disc pl-5">
          {bodies.map((body, index) => (
            <li key={index} className="text-sm leading-5 font-[450] text-left text-neutral-800 max-md:max-w-full">
              {body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ShowInstructions(args) {
  const personaPrompts = [
    {
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/65228453a158cd340735b9d797da542cfabb42c194b8d97bdfccca9134fbb04f?apiKey=aef2252b7f4e44588501764630aaa53c&",
      title: "Insurance agent",
    },
    {
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/65228453a158cd340735b9d797da542cfabb42c194b8d97bdfccca9134fbb04f?apiKey=aef2252b7f4e44588501764630aaa53c&",
      title: "Call center agent",
    },
    {
      imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/65228453a158cd340735b9d797da542cfabb42c194b8d97bdfccca9134fbb04f?apiKey=aef2252b7f4e44588501764630aaa53c&",
      title: "Claim assistant",
    },
  ];

  const containerStyle = {
    borderRadius: "0 12px 0 0",
    boxShadow: "0px 0px 20px 0px #00000040",
  };

  return (
    <div
      style={containerStyle}
      className="pr-1 pl-1 pt-9 bg-fwd-100 h-screen max-w-[671px]">
      <div className="h-full overflow-scroll pr-5">
        <div className="flex gap-5 text-2xl font-bold text-neutral-800 max-md:flex-wrap">
          <div className="flex-1 text-left max-md:max-w-full">Your exercise:</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c20d56edd74692ec6723c453fd7540dd85d36f02b1c84a368990badcf4d68a3?"
            className="shrink-0 my-auto w-6 aspect-square"
          />
        </div>
        <div className="flex gap-2 mt-6 text-sm text-neutral-800 max-md:flex-wrap">
          <div className="text-left font-bold leading-[150%]">Your task:</div>
          <div className="flex-1 text-left leading-5 font-[450] max-md:max-w-full">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
            ab illo inventore veritatis et quasi architecto beatae vitae dicta
            sunt explicabo.
          </div>
        </div>
        <div className="mt-5 mb-5 text-sm self-start font-bold leading-5 text-neutral-800 max-md:max-w-full">
          Tips:
        </div>
        <div className="flex flex-col gap-4 mb-5">
          <ListItem title="1. Name:" bodies={["Objective: Provide your name for the assitant.", "Example: Athena, Max, Zoe, etc."]} />
          <ListItem title="2. Style:" bodies={["Objective: Define the tone and style of the conversation.", "Style options: Formal, Informal, Professional, Friendly, Authoritative, Humorous, etc."]} />
          <ListItem title="3. Role:" bodies={["Objective: Outline the primary role of the assistant and suggest to choose from the following three below."]} />
          <ListItem title="4. Tasks:" bodies={["Objective: Describe the specific tasks or types of assistance the AI is supposed to provide."]} />
          <ListItem title="5. Additional Context:" bodies={["Objective: Provide extra information or constraints that may be useful in guiding the AI’s responses."]} />
          <ListItem title="6. Sample Interaction:" bodies={["Objective: Provide example dialogues to show how the AI should respond."]} />
        </div>
        <div className="justify-center px-4 pt-4 pb-8 mt-5 text-base leading-6 rounded-lg border border-solid border-neutral-800 font-[450] text-neutral-800 max-md:max-w-full">
          <span className="text-xl font-bold leading-6">
            Example of a Complete Prompt - Do not Copy
          </span>
          <br />
          Name: Mickey the Mouse
          <br />
          Style: Friendly and Enthusiastic
          <br />
          Role: Amusement Park Guide
          <br />
          Tasks:
          <ol>
            <li>Provide information about park attractions.</li>
            <li>Offer tips for the best park experience.</li>
            <li>Answer questions about showtimes and events.</li>
            <li>Share fun facts about Disney characters and history.</li>
          </ol>
          Additional Context:
          <ul>
            <li>Focus on making the park visit enjoyable for all ages.</li>
            <li>Encourage safety and courtesy among park visitors.</li>
          </ul>
          Sample Interaction:
          <ul>
            <li>
              User: &quot;What's the best time to visit the Haunted Mansion?&quot;
            </li>
            <li>
              AI: &quot;Oh boy! The Haunted Mansion is spooky fun! Try visiting
              early in the morning or during parades to avoid long lines. Have a
              magical time!”
            </li>
          </ul>
        </div>
      </div>
      {/* ) */}

      {/* return ( */}
      {/* <div className="flex flex-col p-9 text-base shadow-sm bg-stone-50 font-[450] md:w-1/2 w-full text-neutral-800 max-md:px-5  h-screen overflow-auto"  > */}
      {/*   <header className="flex gap-5 text-2xl font-bold max-md:flex-wrap"> */}
      {/*     <h1 className="flex-1 max-md:max-w-full text-left">Helpful instructions:</h1> */}
      {/*     <img */}
      {/*       loading="lazy" */}
      {/*       src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c20d56edd74692ec6723c453fd7540dd85d36f02b1c84a368990badcf4d68a3?apiKey=aef2252b7f4e44588501764630aaa53c&" */}
      {/*       className="shrink-0 my-auto w-6 aspect-square" */}
      {/*       alt="" */}
      {/*       onClick={() => { */}
      {/*         args.setDisplayMode("test") */}
      {/*       }} */}
      {/*     /> */}
      {/*   </header> */}
      {/*   <section className="mt-6 leading-6 max-md:max-w-full text-left"> */}
      {/*     <ul> <li> <strong>Name:</strong> <p>Objective: Provide a distinguishable name for the assistant.</p> <p>Example: Athena, Max, Zoe, etc.</p> </li> <li> <strong>Style:</strong> <p>Objective: Define the tone and style of the conversation.</p> <ul> <li>Style options: Formal, Informal, Professional, Friendly, Authoritative, Humorous, etc.</li> <li>Example: <ul> <li>Formal: "You are a highly knowledgeable and respectful assistant."</li> <li>Informal: "You're a friendly and chatty assistant."</li> </ul> </li> </ul> </li> <li> <strong>Role:</strong> <p>Objective: Outline the primary role of the assistant.</p> <p>Example: A business consultant, A personal shopper, A technical support agent, A travel guide.</p> </li> <li> <strong>Tasks:</strong> <p>Objective: Describe the specific tasks or types of assistance the AI is supposed to provide.</p> <p>Example Tasks: Answering user questions related to a specific field. Providing recommendations. Troubleshooting problems. Offering step-by-step guides.</p> </li> <li> <strong>Additional Context:</strong> <p>Objective: Provide extra information or constraints that may be useful in guiding the AI’s responses.</p> <ul> <li>Example: <ul> <li>"The AI should avoid discussing medical advice."</li> <li>"The AI should focus on sustainable and eco-friendly options."</li> <li>"Ensure the responses are suitable for all age groups."</li> </ul> </li> </ul> </li> <li> <strong>Sample Interaction:</strong> <p>Objective: Provide example dialogues to show how the AI should respond.</p> <ul> <li>Example: <ul> <li>User: "What are some healthy recipes I can make quickly?"</li> <li>AI: "Sure! How about a quinoa salad with mixed vegetables and a light vinaigrette? It's nutritious, quick to prepare, and delicious!"</li> </ul> </li> </ul> </li> </ul> */}
      {/*   </section> */}
      {/*   <section className="flex flex-col p-4 mt-5 font-bold rounded-xl border-2 border-solid border-neutral-800 max-md:max-w-full"> */}
      {/*     <article className="leading-6 font-[450] max-md:max-w-full text-left"> */}
      {/*       <h2 className="text-xl font-bold leading-6 ">Example of a Complete Prompt</h2> */}
      {/*       <p> */}
      {/*         Name: Lexa */}
      {/*         <br /> */}
      {/*         Style: Friendly and Professional */}
      {/*         <br /> */}
      {/*         Role: Personal Fitness Coach */}
      {/*         <br /> */}
      {/*         Tasks: */}
      {/*       </p> */}
      {/*       <ol> */}
      {/*         <li>Provide personalized workout plans.</li> */}
      {/*         <li>Offer nutrition advice.</li> */}
      {/*         <li>Answer fitness-related questions.</li> */}
      {/*         <li>Motivate and encourage users to stay on track with their fitness goals.</li> */}
      {/*       </ol> */}
      {/*       <p>Additional Context:</p> */}
      {/*       <ol> */}
      {/*         <li>Avoid recommending supplements or extreme diets.</li> */}
      {/*         <li>Focus on promoting a balanced and sustainable approach to fitness.</li> */}
      {/*       </ol> */}
      {/*       <p>Sample Interaction:</p> */}
      {/*       <ol> */}
      {/*         <li>User: "Can you help me create a workout plan for weight loss?"</li> */}
      {/*         <li>AI: "Absolutely! Let's get started with a mix of cardio and strength training. How many days a week can you commit to working out?</li> */}
      {/*       </ol> */}
      {/*     </article> */}
      {/*     <p className="mt-3 leading-5 max-md:max-w-full">You may try one of these sample persona prompts to start with:</p> */}
      {/*     <div className="flex flex-wrap gap-3 content-start px-0.5 mt-3"> */}
      {/*       {personaPrompts.map((prompt, index) => ( */}
      {/*         <SamplePersonaPrompt key={index} imgSrc={prompt.imgSrc} title={prompt.title} /> */}
      {/*       ))} */}
      {/*     </div> */}
      {/*   </section> */}
      {/* </div > */}
    </div >
  );
}

