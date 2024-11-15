import React from "react";
import Image from "next/image";

const MainPage = ({ setSection }: { setSection: Function }) => (
    <main className={"h-full"} style={{ marginBottom: '28px' }}>
        <h1 className={"font-bold text-3xl pt-12 text-center"}>Ana Sayfa</h1>
        <nav className="flex justify-center space-x-4 mt-8 px-4">
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure>
                    <Image alt="Yarışma Odaları" src="/sections/game/main/rooms.jpg" width={400} height={200} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Yarışma Odaları</h2>
                    <p>Oda listesini görmek için tıklayın</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => setSection('rooms')}>Git</button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure>
                    <Image alt="Mağaza" src="/sections/game/main/store.jpg" width={400} height={200} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Mağaza</h2>
                    <p>Mağazaya gitmek için tıklayın</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-secondary" onClick={() => setSection('store')}>Git</button>
                    </div>
                </div>
            </div>
        </nav>
        <nav className="flex justify-center space-x-4 mt-8 px-4">
            <div className="card w-full bg-base-100 shadow-xl image-full" style={{ height: '200px' }}>
                <figure>
                    <Image alt="Lider Tablosu" src="/sections/game/main/leaderboard.jpg" width={800} height={200} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Lider Tablosu</h2>
                    <p>Lider tablosunu görmek için tıklayın</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-tertiary" onClick={() => setSection('leaderboard')}>Git</button>
                    </div>
                </div>
            </div>
        </nav>
    </main>
);

export default MainPage;
