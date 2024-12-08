'use client';

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
    const [username, setUsername] = useState < string > ("");
    const [password, setPassword] = useState < string > ("");
    const [repeatPassword, setRepeatPassword] = useState < string > ("");
    const [email, setEmail] = useState < string > ("");
    const { push } = useRouter();
    const [sessionChecked, setSessionChecked] = useState < boolean > (false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            push('/game');
        } else {
            setSessionChecked(true);
        }
    }, []);

    async function submit(event: React.FormEvent) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username ?? "");
        formData.append('password', password ?? "");
        formData.append('repeatPassword', repeatPassword ?? "");
        formData.append('email', email ?? "");
        axios({
            method: "post",
            url: "https://quizmatix.com/api/register.php",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response: any) => {
            const data = response.data;
            if (data.success) {
                toast.success(data.success);
                localStorage.setItem('token', data.token);
                localStorage.setItem('id', data.id);
                push('/game')
            } else if (data.error) {
                toast.error(data.error);
            }
        }).catch((error: any) => {
            console.error(error);
            toast.error("Bir hata oluştu.");
        });
    }

    return (
        <main className={"flex justify-center items-center text-center h-screen w-full"}>
            <form onSubmit={submit}>
                <h1 className={"font-bold text-3xl mb-5"}>Kayıt Ol</h1>
                <label className="input input-bordered flex items-center gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input type="text" className="grow" placeholder="Kullanıcı Adı" maxLength={16} value={username} onChange={(event) => {
                        setUsername(event.currentTarget.value);
                    }} />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow" placeholder={"Şifre"} value={password} onChange={(event) => {
                        setPassword(event.currentTarget.value);
                    }} />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type="password" className="grow" placeholder={"Tekrar Şifre"} value={repeatPassword} onChange={(event) => {
                        setRepeatPassword(event.currentTarget.value);
                    }} />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                        className="w-4 h-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" className="grow" placeholder="Eposta" value={email} onChange={(event) => {
                        setEmail(event.currentTarget.value);
                    }} />
                </label>
                <p className={"font-bold mb-3"}>Sitemize kayıt olmuş her kullanıcı<br /> sözleşmemizi kabul etmiş
                    sayılır.</p>
                <button type={"submit"} className={"btn btn-primary me-2"}>Kayıt Ol</button>
                <a className={"btn btn-secondary ms-2"} onClick={() => push('/')}>Geri Dön</a>
            </form>
            <Toaster />
        </main>
    );
}
