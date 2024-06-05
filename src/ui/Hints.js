import * as React from "react";

const roles = [
    { id: 1, title: "Insurance agent", imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/65228453a158cd340735b9d797da542cfabb42c194b8d97bdfccca9134fbb04f?apiKey=aef2252b7f4e44588501764630aaa53c&" },
    { id: 2, title: "Call center agent", imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/65228453a158cd340735b9d797da542cfabb42c194b8d97bdfccca9134fbb04f?apiKey=aef2252b7f4e44588501764630aaa53c&" },
    { id: 3, title: "Claim assistant", imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/65228453a158cd340735b9d797da542cfabb42c194b8d97bdfccca9134fbb04f?apiKey=aef2252b7f4e44588501764630aaa53c&" },
];

function RoleCard({ title, imgSrc }) {
    return (
        <div className="flex gap-2 p-3 border border-orange-500 border-solid rounded-[44px]">
            <img loading="lazy" src={imgSrc} alt={title} className="shrink-0 w-6 aspect-square" />
            <p className="my-auto">{title}</p>
        </div>
    );
}

function Hints() {
    return (
        <>
            <section className="self-stretch text-base text-left font-bold leading-5  text-neutral-800 pt-5 pb-5">
                You may try one of these sample persona prompts to start with:
            </section>
            <section className="flex flex-wrap gap-3 content-start self-stretch text-base font-bold text-neutral-800">
                {roles.map((role) => (
                    <RoleCard key={role.id} title={role.title} imgSrc={role.imgSrc} />
                ))}
            </section>
        </>
    );
}

export default Hints;