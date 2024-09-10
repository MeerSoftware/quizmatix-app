'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
    const { push } = useRouter();

    return (
        <main className="min-h-screen flex flex-col justify-center items-center p-5">
            <div className="flex flex-col items-center mb-5">
                <Image
                    src={"Quizmatix.png"}
                    width={200}
                    height={200}
                    className={"mb-5"}
                    alt={"Logo"}
                />
                <span className="text-center font-bold text-lg">Türkiye&apos;nin her yerinden katılımcılarla yarışmak için hemen kayıt ol!</span>
            </div>
            <div className="flex justify-center w-full">
                <button className="btn btn-primary me-3" onClick={() => push('/login')}>Giriş Yap</button>
                <button className="btn btn-secondary ms-3" onClick={() => push('/register')}>Kayıt Ol</button>
            </div>
        </main>
    );
}
