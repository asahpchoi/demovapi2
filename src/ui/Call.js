import * as React from "react";

function ImageWithDescription({ src, alt, text }) {
  return (
    <div className="flex relative justify-center items-center px-6 py-4 w-full text-base leading-6 font-[450] text-white max-md:px-5 max-md:max-w-full">
      <div className="flex gap-3 max-md:flex-wrap">
        <img loading="lazy" src={src} alt={alt} className="shrink-0 w-7 aspect-square" />
        <p className="max-md:max-w-full">{text}</p>
      </div>
    </div>
  );
}

function Call() {
  const descriptionData = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ffa7d137025c46d19651138c8f3c14e85d94ce0d3483d98262ec98a14b4c4db1?apiKey=aef2252b7f4e44588501764630aaa53c&", alt: "Icon", text: "How are you!" },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/be87d2d896308274055200387daa02c26e7f7779cb8f696dc9c892b8e29a8998?apiKey=aef2252b7f4e44588501764630aaa53c&",
      alt: "User Icon",
      text: "Hi, I am here to ask for my claim last week.",
    },
  ];

  return (
    <div className="relative flex flex-col justify-center bg-black bg-fwd-100" style={{position: "absolute", zIndex:1, top:0, left:0, right:0, bottom:0}}>
      <main className="flex overflow-hidden relative flex-col py-16 w-full min-h-[840px] max-md:max-w-full">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c60aae4919991f65661e7b49e7a93c46297d780f6a05b2b499535c242363d99?apiKey=aef2252b7f4e44588501764630aaa53c&" alt="" className="object-cover absolute inset-0 size-full" />
        {descriptionData.map((data, index) => (
          <ImageWithDescription key={index} src={data.src} alt={data.alt} text={data.text} />
        ))}
        <footer className="flex relative gap-5 self-center px-5 mt-[471px] max-md:mt-10">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e108dd10106f76a099556116645d5bfb84124b560f105fb8a05e56028de53f8?apiKey=aef2252b7f4e44588501764630aaa53c&" alt="Footer Icon" className="shrink-0 aspect-square w-[74px]" />
          <div className="flex gap-1.5 items-center my-auto">
            <span className="shrink-0 self-stretch my-auto h-3.5 bg-white rounded-[40px] w-[7px]" />
            <span className="shrink-0 self-stretch my-auto w-2 bg-white h-[22px] rounded-[40px]" />
            <span className="shrink-0 self-stretch w-2 bg-white h-[30px] rounded-[40px]" />
            <span className="shrink-0 self-stretch my-auto bg-white h-[22px] rounded-[40px] w-[7px]" />
            <span className="shrink-0 self-stretch my-auto h-3.5 bg-white rounded-[40px] w-[7px]" />
            <span className="shrink-0 self-stretch my-auto bg-white h-[22px] rounded-[40px] w-[7px]" />
            <span className="shrink-0 self-stretch bg-white h-[30px] rounded-[40px] w-[7px]" />
            <span className="shrink-0 self-stretch my-auto bg-white h-[22px] rounded-[40px] w-[7px]" />
            <span className="shrink-0 self-stretch my-auto w-2 bg-white h-[22px] rounded-[40px]" />
            <span className="shrink-0 self-stretch w-2 bg-white h-[30px] rounded-[40px]" />
            <span className="shrink-0 self-stretch my-auto bg-white h-[22px] rounded-[40px] w-[7px]" />
          </div>
          <button className="flex justify-center items-center p-5 bg-red-700 h-[74px] rounded-[60px] w-[74px]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d287365e088cabf0ce2be3aadcc52291651d90548d412e5116117a2e03394a3?apiKey=aef2252b7f4e44588501764630aaa53c&" alt="Footer Main Icon" className="aspect-square w-[34px]" />
          </button>
        </footer>
      </main>
    </div>
  );
}

export default Call;