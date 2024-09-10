'use client';

import Image from "next/image";
import { PageContext } from "./Page";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { ThemeSet } from "@/helpers/Theme";

export default function SettingsPage() {
    const data = useContext(PageContext).data;
    const players = data.players;
    const me = players.filter((p: any) => p.id == localStorage.getItem('id'))[0];
    const { push } = useRouter();

    return (
        <main className="mb-[5rem]">
            <div className="my-profile">
                <div className="profile-image pt-5 h-[calc(100vw-128px)]">
                    <Image
                        className="rounded-full mx-auto"
                        src="https://quizmatix.com/client/assets/profiles/1_1704400430.gif"
                        width={window.innerWidth - 128}
                        height={-1}
                        alt=""
                    />
                </div>
                <div className="username font-bold text-3xl text-center pt-5 mb-3">{me?.username}</div>
                <div className="buttons text-center mb-3">
                    <button className="btn btn-error relative" onClick={() => push('/logout')}>
                        {/* <span className="absolute top-[-5px] right-[-5px] flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span> */}
                        Çıkış</button>
                </div>
            </div>

            <div className="settings mx-3">
                <div className="collapse collapse-arrow bg-base-200 mb-3">
                    <input type="checkbox" name="my-accordion-2" />
                    <div className="collapse-title font-medium">Profil Ayarları</div>
                    <div className="collapse-content">
                        <div className="form-control w-full">
                            <span className="label-text">Kullanıcı Adı</span>
                            <section className="flex justify-between items-center cursor-pointer">
                                <input type="text" value={me?.username} placeholder="Kullanıcı Adı" className="input w-full max-w-xs" disabled />
                                <a className="text-primary mx-2 hidden"
                                >Kaydet</a>
                                <a className="text-primary mx-2"
                                    onClick={(e: any) => {
                                        let element = e.currentTarget;
                                        let input = element.parentElement.firstChild;
                                        let saveButton = element.parentElement.childNodes[1];
                                        if (element.innerHTML == "Düzenle") {
                                            element.innerHTML = "İptal";
                                            element.classList.remove("text-primary");
                                            element.classList.add("text-error");
                                            input.disabled = false;
                                            saveButton.classList.remove("hidden");
                                        } else if (element.innerHTML == "İptal") {
                                            element.innerHTML = "Düzenle";
                                            element.classList.remove("text-error");
                                            element.classList.add("text-primary");
                                            input.disabled = true;
                                            saveButton.classList.add("hidden");
                                        }
                                    }}
                                >Düzenle</a>
                            </section>
                        </div>
                        <span className="label-text">Profil Resmi</span>
                        <input type="file" className="file-input w-full max-w-xs" />
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200 mb-3">
                    <input type="checkbox" name="my-accordion-2" />
                    <div className="collapse-title font-medium">Bildirimler</div>
                    <div className="collapse-content">
                        <div className="form-control w-full">
                            <label className="label cursor-pointer">
                                <span className="label-text">Direkt Mesajlar</span>
                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                            </label>
                        </div>
                        <div className="form-control w-full">
                            <label className="label cursor-pointer">
                                <span className="label-text">Arkadaşlık İstekleri</span>
                                <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200 mb-3">
                    <input type="checkbox" name="my-accordion-2" />
                    <div className="collapse-title font-medium">Uygulama Ayarları</div>
                    <div className="collapse-content">
                        <div className="form-control">
                            <div className="label">
                                <span className="label-text">Tema</span>
                            </div>
                            <select name="cars" id="cars" className="input p-3 h-auto w-full max-w-xs"
                                onChange={(e: any) => {ThemeSet(e.target.value)}}>
                                    <option value="light">Aydınlık</option>
                                    <option value="dark">Karanlık</option>
                                    <option value="cupcake">Cupcake</option>
                                    <option value="bumblebee">Bumblebee</option>
                                    <option value="emerald">Zümrüt</option>
                                    <option value="corporate">Corporate</option>
                                    <option value="synthwave">Synthwave</option>
                                    <option value="retro">Retro</option>
                                    <option value="cyberpunk">Cyberpunk</option>
                                    <option value="valentine">Valentine</option>
                                    <option value="halloween">Halloween</option>
                                    <option value="garden">Bahçe</option>
                                    <option value="forest">Forest</option>
                                    <option value="aqua">Aqua</option>
                                    <option value="lofi">Lofi</option>
                                    <option value="pastel">Pastel</option>
                                    <option value="fantasy">Fantazi</option>
                                    <option value="wireframe">Wireframe</option>
                                    <option value="black">Siyah</option>
                                    <option value="luxury">Luxury</option>
                                    <option value="dracula">Drakula</option>
                                    <option value="cmyk">Cmyk</option>
                                    <option value="autumn">Autumn</option>
                                    <option value="business">Business</option>
                                    <option value="acid">Asit</option>
                                    <option value="lemonade">Limonata</option>
                                    <option value="night">Gece</option>
                                    <option value="coffee">Kahve</option>
                                    <option value="winter">Kış</option>
                                    <option value="dim">Dim</option>
                                    <option value="nord">Nord</option>
                                    <option value="sunset">Sunset</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}