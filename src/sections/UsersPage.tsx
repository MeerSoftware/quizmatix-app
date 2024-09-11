'use client';

import Image from "next/image";
import { PageContext } from "./Page";
import { useContext } from "react";
import Page from '@/consts/PageConst';
import PointStrip from "@/helpers/PointStrip";

export default function UsersPage() {
    const data = useContext(PageContext).data;
    const players = data.players;

    return (
        <main className="mt-3 mb-[10rem]">
            {players.map((p: any) => {
                return (
                    <div className="user grid grid-cols-3 items-center bg-base-200 rounded-xl mx-5 mb-3 cursor-pointer" onClick={() => { data.setSelectedUser(p); data.setCurrentPage(Page.USER_PAGE); } } key={p.id}>
                        <div 
                            className="profile-image ms-4 relative" 
                        >
                            <div data-loaded='false' className="profile-skeleton z-10 w-[64px] h-[64px] data-[loaded=false]:skeleton data-[loaded=false]:shrink-0 data-[loaded=false]:rounded-full absolute top-0 left-0" data-profile={p.username}></div>
                            <Image 
                                data-loaded='false'
                                onLoad={event => {
                                    const parent = document.querySelector(`[data-profile="${p.username}"]`)
                                    if (parent) parent.setAttribute('data-loaded', 'true')
                                    event.currentTarget.setAttribute('data-loaded', 'true')
                                }}
                                onError={event => {
                                    event.currentTarget.src = "https://quizmatix.com/client/assets/profiles/default-profile.png";
                                }}
                                className="rounded-full data-[loaded=false]:opacity-0" 
                                src={'https://quizmatix.com/client/assets/profiles/' + p.profile_img} 
                                width={64} 
                                height={64} 
                                alt="" 
                            />
                        </div>
                        <div className="nickname">{p.username ?? "unknown"}</div>
                        <div className="point text-end me-4">{p.point ? PointStrip(p.point) + "P" : "unknown"}</div>
                    </div>
                );
            })}
        </main>
    );
}