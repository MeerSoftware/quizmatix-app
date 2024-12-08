'use client';

import Message from "@/components/Message";
import { useContext, useState } from "react";
import { PageContext } from "@/sections/Page";
import PlayerFetch from "@/helpers/PlayerFetch";
import TabNumber from "@/consts/TabNumber";
import { PaperAirplaneIcon } from '@heroicons/react/outline';

export default function MessagesPage() {
    const data = useContext(PageContext).data;
    const [msg, setMsg] = useState < string > ("");

    function onkeydown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            sendMessage();
        }
    }

    function sendMessage() {
        setMsg("");
        window.client.sendPacket({ "type": "message", "message": msg, "mtype": "global" });
    }

    function tabClick(event: any, tabnum: TabNumber) {
        let all = document.getElementsByClassName("tab");
        Array.prototype.map.call(all, tab => tab.classList.remove('tab-active'));
        event.currentTarget.classList.add('tab-active');
        data.setCurrentTab(tabnum);
    }

    function onchange(event: React.ChangeEvent<HTMLInputElement>) {
        setMsg(event.currentTarget.value);
    }

    if (typeof data.messages === "undefined") {
        return (
            <main>
                <div className="flex justify-center items-center h-full">
                    <span>Messages are loading...</span>
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-col h-full justify-between overflow-hidden">
            <div role="tablist" className="tabs tabs-bordered">
                <a role="tab" className="tab tab-active" onClick={(e: any) => tabClick(e, TabNumber.CHAT_PAGE)}>Sohbet</a>
                <a role="tab" className="tab" onClick={(e: any) => tabClick(e, TabNumber.INFO_PAGE)}>Bilgi</a>
                <a role="tab" className="tab" onClick={(e: any) => tabClick(e, TabNumber.FRIENDS_PAGE)}>Arkadaşlar</a>
            </div>

            {(() => {
                switch (data.currentTab) {
                    case TabNumber.CHAT_PAGE:
                        return (
                            <div className="flex flex-col h-full pb-28"> {/* Added 28px of padding */}
                                <h1 className={"font-bold text-3xl pt-6 text-center"}>Sohbet</h1>
                                <div className="messages h-full overflow-auto w-full">
                                    <div className={"chat chat-end chat-start"}></div> {/* tailwindcss hack xd */}
                                    {data.messages && data.messages.map((m: any, i: number) => {
                                        const Player: any = PlayerFetch(data.players, m["authorid"]);
                                        return <Message key={i} text={m["message"]} author={m["author"]} authorId={m["authorid"]} profilePicture={Player["profile_img"]} />;
                                    })}
                                </div>
                                <div className="sticky bottom-0 px-4 flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Bir mesaj gönder..."
                                        className="input input-bordered input-primary w-full mr-2"
                                        value={msg}
                                        onChange={onchange}
                                        onKeyDown={onkeydown} />
                                    <button className="btn btn-primary" onClick={sendMessage}>
                                        <PaperAirplaneIcon className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                        )
                    case TabNumber.INFO_PAGE:
                        return (
                            <div className="flex flex-col h-full pb-28"> {/* Added 28px of padding */}
                                <h1 className={"font-bold text-3xl pt-6 text-center mb-3"}>Bilgi</h1>
                                <div className="notices h-full overflow-auto">
                                    {data.notices && data.notices.map((text: string, index: number) => {
                                        return (
                                            <p key={index} className="mb-1">{text}</p>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    case TabNumber.FRIENDS_PAGE:
                        return (
                            <div className="flex flex-col h-full pb-28"> {/* Added 28px of padding */}
                                <h1 className={"font-bold text-3xl pt-6 text-center"}>Arkadaşlar</h1>
                            </div>
                        )
                }
            })()}
        </main>
    );
}
