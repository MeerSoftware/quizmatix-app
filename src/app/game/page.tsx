'use client';

import { useEffect, useState } from "react";
import Client from "@/helpers/Client";
import { Toaster } from "react-hot-toast";
import BottomNavigator from "@/components/BottomNavigator";
import Page from "@/sections/Page";
import PageConst from "@/consts/PageConst";
import Question from "@/helpers/Question";
import State from "@/consts/State";
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
    var clientStates: DataInterface = {};

    [clientStates.loaded, clientStates.setLoaded] = useState < boolean > (false);
    [clientStates.currentPage, clientStates.setCurrentPage] = useState(PageConst.GAME_PAGE);
    [clientStates.rooms, clientStates.setRooms] = useState([]);
    [clientStates.inRoom, clientStates.setInRoom] = useState < boolean > (false);
    [clientStates.gameState, clientStates._setGameState] = useState < State > (State.STARTING_STATE);
    [clientStates.countdown, clientStates.setCountdown] = useState < number > (15);
    [clientStates.currentQuestion, clientStates.setCurrentQuestion] = useState < Question | null > (null);
    [clientStates.messages, clientStates.setMessages] = useState < DataInterface[] > ([]);
    [clientStates.players, clientStates.setPlayers] = useState < DataInterface[] > ([]);
    [clientStates.selectedUser, clientStates.setSelectedUser] = useState < DataInterface[] > ([]);
    [clientStates.currentTab, clientStates.setCurrentTab] = useState < TabNumber > (TabNumber.CHAT_PAGE);
    [clientStates.notices, clientStates.setNotices] = useState < string[] > ([]);
    [clientStates.animation, clientStates.setAnimation] = useState < string > ('');

    useEffect(() => {
        const client: Client = createInstance(
            Client,
            clientStates
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
            {
                clientStates.loaded
                    ?
                    <>
                        <Toaster />
                        <Page page={clientStates.currentPage} data={clientStates} />
                        <BottomNavigator statePage={[clientStates.currentPage, clientStates.setCurrentPage]} stateAnim={[clientStates.animation, clientStates.setAnimation]} />
                    </>
                    :
                    <div className="w-full h-full justify-center items-center flex">
                        <span className="loading loading-ring loading-lg"></span>
                    </div>
            }
        </main>
    );
}
