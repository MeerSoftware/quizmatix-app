'use client';

import DataInterface from "@/interfaces/DataInterface";

export default function QuestionComingPart(data: DataInterface) {
    return (
        <main className={"h-full"}>
            <div className={"flex flex-col justify-center items-center h-full"}>
                <div className="font-bold text-2xl">Yeni soru geliyor...</div>
                <p className="text-xl">{data.countdown}</p>
            </div>
        </main>
    );
}