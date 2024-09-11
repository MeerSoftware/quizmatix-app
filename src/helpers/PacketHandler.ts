import DataInterface from "@/interfaces/DataInterface";
import Answer from "@/helpers/Answer";
import Question from "@/helpers/Question";

class PacketHandler {
    handlePacket(packet: any): void {
        const parsed: DataInterface = JSON.parse(packet);

        switch (parsed.type) {
            case "error":
            case "notice":
                window.client.states.setNotices((oldNotices: any) => [...oldNotices, parsed["isAlert"] ? parsed["alert_text"] : parsed["msg"].replace("<br>", "\n")]);
                break;
            case "rooms":
                window.client.states.setRooms(parsed["rooms"]);
                if (!window.client.states.loaded) {
                    window.client.states.setLoaded(true);
                }
                break;
            case "joined-room":
                window.client.states.setInRoom(true);
                break;
            case "room-countdown":
                const numbers = parsed["html"].match(/\d/g);
                window.client.states.setCountdown(
                    numbers[1] +
                    numbers[3] +
                    numbers[5] +
                    numbers[7]
                );
                break;
            case "message":
                window.client.states.setMessages((oldMessages: any) => [...oldMessages, parsed]);
                break;
            case "players":
                window.client.states.setPlayers(parsed["players"]);
                break;
            case "player":
                window.client.states.setPlayers((oldPlayers: any) => [...oldPlayers, parsed["player"]]);
                break;
            case "rmplayer":
                window.client.states.setPlayers((oldPlayers: any[]) => oldPlayers.filter(p => p["id"] !== parsed["id"]));
                break;
            case "gameContent":
                const contentType = parsed["contentType"];
                if (contentType === "question") {
                    window.client.states.setCurrentQuestion(
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
                window.client.states.setRooms((rooms: DataInterface[]) => {
                    const newRooms: any = [...rooms];
                    rooms.forEach((room: DataInterface, index: number) => {
                        newRooms[index]["status"] = roomsData[index]["status"];
                    })
                    return newRooms;
                });
                break;
        }
    }
} 

export default PacketHandler;