import React from "react";

const RoomsPage = ({ setSection, data }: { setSection: Function, data: any }) => (
    <main className={"h-full"} style={{ marginBottom: '28px' }}>  {/* Alta 28 px margin eklendi */}
        <div className="pb-28">
            <h1 className={"font-bold text-3xl pt-12 text-center"}>Yarışma Odaları</h1>
            <button className="btn btn-accent mb-4" onClick={() => setSection('main')}>Ana Sayfa</button>
            {data.rooms.map((r: any) => (
                <div className="mt-16 w-full bg-base-100 shadow-xl image-full" key={r["id"]}>
                    <div className="p-8 bg-base-200 rounded-xl">
                        <h2 className="text-2xl font-bold">{r["name"]}</h2>
                        <p className={"text-primary text-start"}>Oyuncular : {Object.keys(r["players"]).length}/{r["maxPlayers"]}</p>
                        <p className={"text-success text-start"}>Giriş Ücreti : {r["price"]} $</p>
                        <p className={"text-warning text-start"}>{r["status"]}</p>
                        <p className={"text-info text-start"}>Seviye : {r["level"]}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary" onClick={() => { window.client.joinRoom(r["id"]) }}>Yarışmaya Katıl</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </main>
);

export default RoomsPage;
