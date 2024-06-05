import * as React from "react";
import { Select, MenuItem } from "@mui/material";
import person from "../images/person.svg"
import ratingBg from "../images/ratingBg.svg"
import goBackAi from "../images/goBackAi.png"

const ScoreSection = ({ result }) => (
  <section className="flex flex-col grow px-5 py-4 mx-auto w-full rounded-2xl border-4 border-emerald-300 border-solid shadow-sm bg-neutral-800 max-md:mt-6">
    <div className="flex gap-5 justify-between px-4">
      <div className="shrink-0 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
      <div className="shrink-0 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
    </div>
    <div className="flex z-10 gap-3 justify-center self-center -mt-1">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5528268f00dfa617b9cfa0cd836aca686b0280baee52d9f65d44dadc5b905e0?apiKey=aef2252b7f4e44588501764630aaa53c&" alt="Icon 1" className="shrink-0 w-6 aspect-square" />
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5528268f00dfa617b9cfa0cd836aca686b0280baee52d9f65d44dadc5b905e0?apiKey=aef2252b7f4e44588501764630aaa53c&" alt="Icon 2" className="shrink-0 w-6 aspect-square" />
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/eeb01349eac2b2411e7026a4a917123ff870786aa0da0b0f80a239c91bb4ee60?apiKey=aef2252b7f4e44588501764630aaa53c&" alt="Icon 3" className="shrink-0 w-6 aspect-square" />
    </div>
    <h2 className="self-center mt-3 text-sm font-bold text-center text-neutral-400">OVERALL SCORE</h2>
    <div className="self-center text-2xl font-bold leading-8 text-center text-neutral-400">
      <span className="text-4xl leading-[49px]">{result.score}</span>
      <span className="text-base leading-5 text-neutral-400"> /100 </span>
    </div>
    <FeedbackSection
      title="Things you did well:"
      items={[
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/a25d6623d66ef09e52a23375bffddb74b864ee9592bbb334e01777e0669735a7?apiKey=aef2252b7f4e44588501764630aaa53c&",
          alt: "feedback 1",
          text: result.donewell
        },
      ]}
    />
    <FeedbackSection
      title="Things you didn’t do well:"
      items={[
        {
          img: "https://cdn.builder.io/api/v1/image/assets/TEMP/65dafbbcf1c71fce5647b13c90e6e88bb97f63620402e6490a2e734f91f8fc0f?apiKey=aef2252b7f4e44588501764630aaa53c&",
          alt: "feedback 2",
          text: result.notdonewell
        },
      ]}
    />
    <div className="flex gap-5 justify-between px-4 mt-3">
      <div className="shrink-0 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
      <div className="shrink-0 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
    </div>
  </section>
);

const FeedbackSection = ({ title, items }) => (
  <section className="flex flex-col px-6 py-5 mt-3.5 text-white max-md:px-5">
    <h3 className="text-base font-bold">{title}</h3>
    {items.map((item, index) => (
      <div key={index} className="flex gap-2 mt-4 text-sm leading-5 font-[450]">
        <img loading="lazy" src={item.img} alt={item.alt} className="shrink-0 self-start w-6 aspect-square" />
        <p className="flex-1">{item.text}</p>
      </div>
    ))}
  </section>
);

const ImprovementsSection = ({ result }) => (
  <section className="flex flex-col grow self-stretch p-4 w-full text-base rounded-lg backdrop-blur-[10px] bg-white bg-opacity-70 font-[450] text-neutral-800 max-md:mt-6">
    <h3 className="self-center font-bold">Improvements</h3>
    <p className="mt-4 leading-6">
      {result.improvement}
    </p>
    <div className="justify-center p-4 mt-4 text-sm leading-5 bg-gray-100 rounded-lg">
      <span className="text-base font-bold leading-5"> Try saying this next time: </span>
      <br />
      <span className="text-base leading-6">
        {result.nexttime}
      </span>
    </div>
  </section>
);

export function Result({ result, userlist, sessionId }) {
  const [data, setData] = React.useState({})
  React.useEffect(
    () => {
      try {
        const temp = JSON.parse(result.replace('```json', ''))
        //setData(JSON.parse(temp));

        setData(temp)
      }
      catch (e) {

      }

    }, [result]
  )

  return (
    <div className="flex flex-col" style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#FFFFFF",
      backgroundImage: `url(${ratingBg})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",

    }}>
      <div className="p-9 flex flex-row justify-center">
        <div className="flex gap-4 justify-center text-base font-bold text-neutral-800 max-md:ml-2.5">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5eccd0cf9d1dbad8df1ed9b5b5532b98d226c847c16bafd04c30b8477fba72b0?"
            className="shrink-0 max-w-full aspect-[2.56] w-[108px]"
          />
          <div className="self-center">FWD Gen AI build your bot</div>
        </div>
        <div className="flex flex-1 gap-2 justify-end self-end text-sm whitespace-nowrap">
          <div className="self-end">
            <Select
              onChange={(event) => {
                const id = event.target.value;
                window.location.replace(`?sid=${id}`);
              }}
              value={sessionId}
            >
              {userlist.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </div>
          <img
            loading="lazy"
            src={person} alt="Notification icon"
            className="shrink-0 w-10 aspect-square"
          />
        </div>
      </div>
      <div style={{ position: "fixed", top: "40vh", right: "10vw" }} onClick={() => window.location = "/"}>
        <img src={goBackAi} alt="Go back to AI" className="" style={{}} />
      </div>
      <div className="flex flex-1" style={{ justifyContent: "center" }}>
        <div className="flex-1 flex flex-col max-w-[726px]">
          <div className="self-center text-3xl font-bold text-center text-neutral-800 max-md:max-w-full">
            Nicely done! Here’s your score
          </div>
          <div className="mt-6 w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow px-5 py-4 mx-auto w-full rounded-2xl border-4 border-emerald-300 border-solid shadow-sm bg-neutral-800 max-md:mt-6">
                  <div className="flex gap-5 justify-between px-4">
                    <div className="shrink-0 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
                    <div className="shrink-0 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
                  </div>
                  <div className="flex z-10 gap-3 justify-center self-center -mt-1">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5528268f00dfa617b9cfa0cd836aca686b0280baee52d9f65d44dadc5b905e0?"
                      className="shrink-0 w-6 aspect-square"
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5528268f00dfa617b9cfa0cd836aca686b0280baee52d9f65d44dadc5b905e0?"
                      className="shrink-0 w-6 aspect-square"
                    />
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdc68e5e2dfa671a49f3523c2801975b1e1d7888f31f06fe700ab4a6c72e563e?"
                      className="shrink-0 w-6 aspect-square"
                    />
                  </div>
                  <div className="self-center mt-3 text-sm font-bold text-center text-neutral-400">
                    OVERALL SCORE
                  </div>
                  <div className="self-center text-2xl font-bold leading-8 text-center text-neutral-400">
                    <span className="text-4xl leading-[49px]">89</span>{" "}
                    <span className="text-base leading-5 text-neutral-400">
                      /100
                    </span>
                  </div>
                  <div className="flex flex-col px-6 pb-5 mt-3.5 text-sm text-white font-[450] max-md:px-5">
                    <div className="text-base font-bold">Things you did well:</div>
                    <div className="flex gap-2 mt-4 leading-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a25d6623d66ef09e52a23375bffddb74b864ee9592bbb334e01777e0669735a7?"
                        className="shrink-0 my-auto w-6 aspect-square"
                      />
                      <div className="flex-1">
                        Talk about customer background and expressed interest.
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 leading-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a25d6623d66ef09e52a23375bffddb74b864ee9592bbb334e01777e0669735a7?"
                        className="shrink-0 my-auto w-6 aspect-square"
                      />
                      <div className="flex-1">
                        Lorem ipsum dolor sit amet consectur. Volutpat venenatis sem
                        et adipiscing.
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 leading-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a25d6623d66ef09e52a23375bffddb74b864ee9592bbb334e01777e0669735a7?"
                        className="shrink-0 my-auto w-6 aspect-square"
                      />
                      <div className="flex-1">
                        Lorem ipsum dolor sit amet consectur. Volutpat venenatis sem
                        et adipiscing.
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col px-6 pb-3 mt-3 text-sm text-white font-[450] max-md:px-5">
                    <div className="text-base font-bold">
                      Things you didn’t do well:
                    </div>
                    <div className="flex gap-2 mt-4 leading-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/65dafbbcf1c71fce5647b13c90e6e88bb97f63620402e6490a2e734f91f8fc0f?"
                        className="shrink-0 my-auto w-6 aspect-square"
                      />
                      <div className="flex-1">Start with a friendly greeting.</div>
                    </div>
                    <div className="flex gap-2 mt-4 leading-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/65dafbbcf1c71fce5647b13c90e6e88bb97f63620402e6490a2e734f91f8fc0f?"
                        className="shrink-0 my-auto w-6 aspect-square"
                      />
                      <div className="flex-1">
                        Lorem ipsum dolor sit amet consectur. Volutpat venenatis sem
                        et adipiscing.
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 leading-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/65dafbbcf1c71fce5647b13c90e6e88bb97f63620402e6490a2e734f91f8fc0f?"
                        className="shrink-0 my-auto w-6 aspect-square"
                      />
                      <div className="flex-1">
                        Lorem ipsum dolor sit amet consectur. Volutpat venenatis sem
                        et adipiscing.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between px-4 mt-3">
                    <div className="shrink-0 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
                    <div className="shrink-0 w-2.5 h-2.5 bg-emerald-300 rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow px-4 pt-4 w-full text-base rounded-lg backdrop-blur-[10px] bg-orange-100 bg-opacity-50 font-[450] text-neutral-800 max-md:mt-6">
                  <div className="self-center font-bold">Improvements</div>
                  <div className="mt-4 leading-6">
                    Consider starting the conversation with a friendly greeting,
                    such as &quot;Good morning/afternoon, thank you for taking the
                    time to meet with me today. I’m excited to discuss your
                    insurance needs.”
                  </div>
                  <div className="justify-center p-4 mt-4 text-sm leading-5 bg-white rounded-lg">
                    <span className="text-base font-bold leading-5">
                      Try saying this next time:
                    </span>
                    <br />
                    <span className="text-base leading-6">
                      Hi, thank you for coming in today. I’m looking forward to
                      learning more about your insurance needs and how we can help
                      you.
                    </span>
                  </div>
                  <div className="mt-4 leading-6">
                    Consider starting the conversation with a friendly greeting,
                    such as &quot;Good morning/afternoon, thank you for taking the
                    time to meet with me today. I’m excited to discuss your
                    insurance needs.”
                  </div>
                  <div className="px-4 pt-4 mt-4 text-sm leading-5 bg-white rounded-lg">
                    <span className="text-base font-bold leading-5">
                      Try saying this next time:
                    </span>
                    <br />
                    <span className="text-base leading-6">
                      Hi, thank you for coming in today. I’m looking forward to
                      learning more about your insurance needs and how we can help
                      you.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (

    <div className="flex flex-col max-w-[726px]">
      <header className="self-center text-3xl font-bold text-center text-neutral-800 max-md:max-w-full">
        Nicely done! Here’s your score
      </header>
      <main className="mt-6 w-full max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 ">
          <article className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full bg-fwd-100">
            <ScoreSection result={data} />
          </article>
          <aside className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full bg-fwd-100">
            <ImprovementsSection result={data} />
          </aside>
        </div>
      </main>
    </div>

  );
}

