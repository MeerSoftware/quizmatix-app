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
        const client: Client = createInstance(Client);
        window.client = client;

        const handleNotices = (event: MessageEvent<any>) => {
            const parsed = JSON.parse(event.data);

            switch (parsed.type) {
                case "error":
                case "notice":
                    setNotices(oldNotices => [...oldNotices, parsed["isAlert"] ? parsed["alert_text"] : parsed["msg"].replace("<br>", "\n")]);
                    break;
                case "rooms":
                    setRooms(parsed["rooms"]);
                    if (!loaded) {
                        setLoaded(true);
                    }
                    break;
                case "joined-room":
                    setInRoom(true);
                    break;
                case "room-countdown":
                    const numbers = parsed["html"].match(/\d/g);
                    setCountdown(
                        numbers[1] +
                        numbers[3] +
                        numbers[5] +
                        numbers[7]
                    );
                    break;
                case "message":
                    setMessages(oldMessages => [...oldMessages, parsed]);
                    break;
                case "players":
                    setPlayers(parsed["players"]);
                    break;
                case "player":
                    setPlayers(oldPlayers => [...oldPlayers, parsed["player"]]);
                    break;
                case "rmplayer":
                    setPlayers(oldPlayers => oldPlayers.filter(p => p["id"] !== parsed["id"]));
                    break;
                case "gameContent":
                    const contentType = parsed["contentType"];
                    if (contentType === "question") {
                        setCurrentQuestion(
                            new Question(
                                parsed["question"]["img"],
                                parsed["question"]["title"], [
                                new Answer("A", parsed["question"]["a"]),
                                new Answer("B", parsed["question"]["b"]),
                                new Answer("C", parsed["question"]["c"]),
                                new Answer("D", parsed["question"]["d"])
                            ])
                        );
                    }
                    break;
                case "rooms-status":
                    const roomsData = parsed["rooms"];
                    setRooms(rooms => {
                        const newRooms: any = [...rooms];
                        rooms.forEach((room: DataInterface, index: number) => {
                            newRooms[index]["status"] = roomsData[index]["status"];
                        })
                        return newRooms;
                    });
                    break;
            }
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