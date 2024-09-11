'use client';

import Image from "next/image";

export default function LoadingPart() {
    return (
        <main className={"h-full"}>
            <div className={"flex flex-col justify-center items-center h-full"}>
                <Image
                    src={"/Quizmatix.png"}
                    width={100}
                    height={100}
                    className={"mb-5"}
                    alt={"Logo"}
                />
                <span className="loading loading-dots loading-lg"></span>
            </div>
        </main>
    );
}