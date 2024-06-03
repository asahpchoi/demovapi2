import * as React from "react";
import {
    Button,
    MenuItem,
    Modal,
    Select,
    Stack,
    Radio, RadioGroup, FormControlLabel,
  
  } from "@mui/material";
function ProfileBadge({ label, value, src, alt }) {
    return (
        <div className="flex gap-2.5 items-center px-2 py-1 my-auto bg-white bg-opacity-50 rounded-[100px]">
            <span className="self-stretch my-auto font-[450] text-neutral-800">{label}</span>
            <span className="self-stretch my-auto font-bold text-right text-orange-500">{value}</span>
            <img loading="lazy" src={src} alt={alt} className="shrink-0 self-stretch w-6 aspect-square" />
        </div>
    );
}

export function Header({sessionId, userlist}) {
    return (
        <section className="flex gap-4 p-9 max-md:flex-wrap max-md:px-5">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a57331fbf0a55474f99eae53aa596f937ee260af5b00c901d2235c8722ce4450?apiKey=aef2252b7f4e44588501764630aaa53c&"
                alt=""
                className="shrink-0 max-w-full aspect-[2.56] w-[108px]"
            />
            <h1 className="flex-1 my-auto text-base font-bold text-neutral-800 max-md:max-w-full">
                FWD Gen AI build your bot
            </h1>
            <div className="flex gap-2 self-start text-sm whitespace-nowrap">
                <Select
                    onChange={(event) => {
                        const id = event.target.value;
                        window.location.replace(`?sid=${id}`);
                    }}
                    value={sessionId}
                    className="m-1"
                >
                    {userlist.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.username}
                        </MenuItem>
                    ))}
                </Select>
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/be758c483c9aa6a5a7515c547efba855e30e682e614d50b179f33f13a06bacf3?apiKey=aef2252b7f4e44588501764630aaa53c&"
                    alt="Notification icon"
                    className="shrink-0 w-10 aspect-square"
                />
            </div>
        </section>
    );
}
