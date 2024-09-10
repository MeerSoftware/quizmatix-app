'use client';

import DataInterface from "@/interfaces/DataInterface";
import GamePage from "@/sections/GamePage";
import MessagesPage from "@/sections/MessagesPage";
import { createContext, useState } from "react";
import SettingsPage from "./SettingsPage";
import UsersPage from "./UsersPage";
import UserPage from "./UserPage";

export const PageContext = createContext<{ [key: string]: any }>({});

export default function Page({ page, data }: { page: number, data: DataInterface }) {
    const [pages, setPages] = useState([
        <GamePage key={"game"} />,
        <MessagesPage key={"message"} />,
        <UsersPage key={"users"} />,
        <SettingsPage key={"setting"} />,
        <UserPage key={"user"} />
    ]);

    return (
        <PageContext.Provider value={{ data }}>
            {pages[page]}
        </PageContext.Provider>
    );
}