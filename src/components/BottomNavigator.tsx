'use client';

import { useState } from 'react';
import { HomeIcon, ChatIcon, UsersIcon, CogIcon } from '@heroicons/react/outline';
import Page from "@/consts/PageConst";

type BottomNavigatorProps = {
    statePage: [string, React.Dispatch<React.SetStateAction<string>>];
    stateAnim: [string, React.Dispatch<React.SetStateAction<string>>];
};

export default function BottomNavigator({ statePage, stateAnim }: BottomNavigatorProps) {
    const [_currentPage, setCurrentPage] = statePage;
    const [_animation, setAnimation] = stateAnim;

    const changePage = (page: keyof typeof Page) => {
        setAnimation('slide-out');
        setTimeout(() => {
            setCurrentPage(page);
            setAnimation('slide-in');
        }, 300); // Duration of the animation
    };

    return (
        <>
            <div className="grid grid-cols-4 justify-items-center items-center bg-base-300 fixed bottom-0 left-0 w-full p-5 z-20">
                <div className="flex flex-col items-center cursor-pointer" onClick={() => changePage(Page.GAME_PAGE)}>
                    <HomeIcon className="w-8 h-8" />
                    <span>Yarışma</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={() => changePage(Page.MESSAGES_PAGE)}>
                    <ChatIcon className="w-8 h-8" />
                    <span>Sohbet</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={() => changePage(Page.USERS_PAGE)}>
                    <UsersIcon className="w-8 h-8" />
                    <span>Arkadaşlar</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer" onClick={() => changePage(Page.SETTINGS_PAGE)}>
                    <CogIcon className="w-8 h-8" />
                    <span>Ayarlar</span>
                </div>
            </div>
            <style jsx>{`
                .page-container {
                    position: relative;
                }
                .page {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
            `}</style>
        </>
    );
}
