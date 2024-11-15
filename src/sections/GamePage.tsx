'use client';

import React, { useContext, useState } from "react";
import { PageContext } from "@/sections/Page";
import MainPage from "@/sections/game/MainPage";
import RoomsPage from "@/sections/game/RoomsPage";
import Leaderboard from "@/sections/game/LeaderboardPage";
import LoadingPart from "@/components/LoadingPart";
import QuestionComingPart from "@/components/QuestionComingPart";
import StartingPart from "@/components/StartingPart";
import Image from "next/image";
import State from "@/consts/State";

export default function GamePage() {
    const data = useContext(PageContext).data;
    const [section, setSection] = useState('main');

    if (!data.rooms) return <LoadingPart />;

    if (data.inRoom) {
        if (data.question && !data.question.answered) {
            return (
                <main className={"h-full"}>
                    <div className={"flex flex-col justify-center items-center h-full text-center"}>
                        <Image alt="" src={data.question.img} width={200} height={-1} />
                        <h1 className="max-w-80 break-words font-bold text-lg mb-4">{data.question.title}</h1>
                        <ul>
                            {data.question.answers.map((a: any) => (
                                <button className="btn btn-wide mb-2" onClick={() => {
                                    window.client.sendPacket({
                                        type: "answer",
                                        answer: a.key
                                    });
                                    data.question.answered = true;
                                }} key={a.key}>{a.value}</button>
                            ))}
                        </ul>
                    </div>
                </main>
            );
        } else if (data.question && data.question.answered) {
            return <QuestionComingPart data={data} />;
        }
        if (data.gameState === State.STARTING_STATE) {
            return <StartingPart data={data} />;
        }
        return (
            <main className={"h-full"}>
                <div className={"flex flex-col justify-center items-center h-full"}>
                    <div className="font-bold">Oyun içerisindesiniz...</div>
                </div>
            </main>
        );
    }

    return (
        <>
            {section === 'main' && <MainPage setSection={setSection} />}
            {section === 'rooms' && <RoomsPage setSection={setSection} data={data} />}
            {section === 'leaderboard' && <Leaderboard leaderboardData={[{ name: 'Ahmet', score: 1500 },
            { name: 'Mehmet', score: 1400 },
            { name: 'Ayşe', score: 1300 },]} />}  {/* Pass leaderboardData */}
            {/* Diğer sayfaları buraya ekleyebilirsiniz */}
        </>
    );
};