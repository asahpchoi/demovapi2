import * as React from "react";

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

export function Result({result}) {


    return (

        <div className="flex flex-col max-w-[726px]">
            <header className="self-center text-3xl font-bold text-center text-neutral-800 max-md:max-w-full">
                Nicely done! Here’s your score
            </header>
            <main className="mt-6 w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 ">
                    <article className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full bg-fwd-100">
                        <ScoreSection result={result} />
                    </article>
                    <aside className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full bg-fwd-100">
                        <ImprovementsSection result={result} />
                    </aside>
                </div>
            </main>
        </div>

    );
}

