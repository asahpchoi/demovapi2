import * as React from "react";
import {

    MenuItem,

    Select,


} from "@mui/material";
import logo from "../images/logo.svg"
import person from "../images/person.svg"

export function Header({ sessionId, userlist, logoAction }) {
    return (
        <section className="flex gap-4 p-2 max-md:flex-wrap max-md:px-5">
            <img
                loading="lazy"
                src={logo}
                alt=""
                className="shrink-0 max-w-full aspect-[2.56] w-[108px]"
                onClick={logoAction}
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
                    src={person} alt="Notification icon"
                    className="shrink-0 w-10 aspect-square"
                />
            </div>
        </section>
    );
}
