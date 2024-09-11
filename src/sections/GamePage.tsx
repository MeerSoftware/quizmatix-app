'use client';

import React, { useContext } from "react";
import { PageContext } from "@/sections/Page";
import Image from "next/image";
import { STARTING_STATE } from "@/consts/StatesConst";
import Question from "@/helpers/Question";
import Answer from "@/helpers/Answer";

/* Parts */
import LoadingPart from "@/components/LoadingPart";
import QuestionComingPart from "@/components/QuestionComingPart";
import StartingPart from "@/components/StartingPart";

export default function GamePage() {
    const data = useContext(PageContext).data;

    function roomsToJSX() {
        const jsxRooms: React.JSX.Element[] = [];
        data.rooms.map(function (r: any) {
            jsxRooms.push(
                <div className="pt-16 card w-full bg-base-100 shadow-xl image-full" key={r["id"]}>
                    <div className="card-body bg-base-200 rounded-xl">
                        <h2 className="card-title">{r["name"]}</h2>
                        <p className={"text-primary text-start"}>Oyuncular : {Object.keys(r["players"]).length}/{r["maxPlayers"]}</p>
                        <p className={"text-success text-start"}>Giriş Ücreti : {r["price"]} $</p>
                        <p className={"text-warning text-start"}>{r["status"]}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={() => { window.client.joinRoom(r["id"]) }}>Yarışmaya Katıl</button>
                        </div>
                    </div>
                </div>
            );
        });
        return jsxRooms;
    }

    if (!data.rooms || data.rooms.length <= 0)
        return (
            <LoadingPart />
        );

    if (data.inRoom) {
        if (data.question && !data.question.answered) {
            return (
                <main className={"h-full"}>
                    <div className={"flex flex-col justify-center items-center h-full text-center"}>
                        <Image alt="" src={data.question.img} width={200} height={-1} />
                        <h1 className="max-w-80 break-words font-bold text-lg mb-4">{data.question.title}</h1>
                        <ul>
                            {data.question.answers.map((a: any) => {
                                return <button className="btn btn-wide mb-2" onClick={() => {
                                    // answer question
                                    window.client.sendPacket({
                                        type: "answer",
                                        answer: a.key
                                    });
                                    data.question.answered = true;
                                }} key={a.key}>{a.value}</button>;
                            })}
                        </ul>
                    </div>
                </main>
            );
        }
        else if (data.question && data.question.answered) {
            return (
                <QuestionComingPart data={data} />
            );
        }

        if (data.gameState === STARTING_STATE) {
            return (
                <StartingPart data={data} />
            );
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
        <main className={"h-full"}>
            <div>
                <h1 className={"font-bold text-3xl pt-12 text-center"}>Odalar</h1>
                {roomsToJSX()}
            </div>
        </main>
    );
};