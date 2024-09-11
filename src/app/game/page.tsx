'use client';

import { useEffect, useState } from "react";
import Client from "@/helpers/Client";
import { Toaster } from "react-hot-toast";
import BottomNavigator from "@/components/BottomNavigator";
import Page from "@/sections/Page";
import PageConst from "@/consts/PageConst";
import Question from "@/helpers/Question";
import Answer from "@/helpers/Answer";
import { STARTING_STATE } from "@/consts/StatesConst";
import DataInterface from "@/interfaces/DataInterface";
import TabNumber from "@/consts/TabNumber";
import createInstance from "@/helpers/InstanceCreator";
import PacketHandler from "@/helpers/PacketHandler";

declare global {
    interface Window {
        client: Client;
    }
}

export default function Game() {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(PageConst.GAME_PAGE);
    const [rooms, setRooms] = useState([]);
    const [inRoom, setInRoom] = useState(false);
    const [gameState, _setGameState] = useState(STARTING_STATE);
    const [countdown, setCountdown] = useState(15);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [messages, setMessages] = useState<DataInterface[]>([]);
    const [players, setPlayers] = useState<DataInterface[]>([]);
    const [selectedUser, setSelectedUser] = useState<DataInterface[]>([]);
    const [currentTab, setCurrentTab] = useState<TabNumber>(TabNumber.CHAT_PAGE);
    const [notices, setNotices] = useState<string[]>([]);

    useEffect(() => {
        const client: Client = createInstance(
            Client,
            {loaded, setLoaded, rooms, setRooms, inRoom, setInRoom, gameState, _setGameState, countdown, setCountdown, currentQuestion, setCurrentQuestion, messages, setMessages, players, setPlayers, selectedUser, setSelectedUser, currentPage, setCurrentPage, currentTab, setCurrentTab, notices, setNotices}
        );
        window.client = client;
        const handler = new PacketHandler();

        const handleNotices = (event: MessageEvent<any>) => {
            handler.handlePacket(event.data);
        }

        const onOpen = (_event: any) => {
            setInterval(() => {
                client?.sendPacket({
                    type: "roomsStatus"
                })
            }, 1000)
            client?.sendPacket({
                type: "rooms"
            });
        }

        client.openHooks.add(onOpen);
        client.messageHooks.add(handleNotices);
    }, []);

    return (
        <main className="w-max-screen h-screen">
            <Toaster />
            <Page page={currentPage} data={{ 'rooms': rooms, 'inRoom': inRoom, 'gameState': gameState, 'countdown': countdown, 'messages': messages, 'players': players, 'selectedUser': [selectedUser, setSelectedUser], 'question': currentQuestion, 'currentPage': [currentPage, setCurrentPage], 'currentTab': [currentTab, setCurrentTab], 'notices': notices }} />
            {loaded ? <BottomNavigator state={[currentPage, setCurrentPage]} /> : ''}
        </main>
    );
}