import Hooks from "@/helpers/Hooks";
import config from "@/Config";
import DataInterface from "@/interfaces/DataInterface";

class Client {
    ws: WebSocket;

    openHooks: Hooks;
    messageHooks: Hooks;
    closeHooks: Hooks;
    errorHooks: Hooks;

    states: DataInterface; // client states

    constructor(states: DataInterface) {
        this.ws = new WebSocket("wss://ratchet.quizmatix.com/wss2/game");

        this.ws.onopen = (ev: Event) => {
            this.onOpen(ev);
        }

        this.ws.onmessage = (ev: MessageEvent<any>) => {
            this.onMessage(ev);
        }

        this.ws.onclose = (ev: CloseEvent) => {
            this.onClose(ev);
        }

        this.ws.onerror = (ev: Event) => {
            this.onError(ev);
        }

        this.openHooks = new Hooks();
        this.messageHooks = new Hooks();
        this.closeHooks = new Hooks();
        this.errorHooks = new Hooks();

        this.states = states;
    }

    onOpen(event: any): void {
        this.sendPacket({
            token: localStorage.getItem('token'),
            type: "login"
        });
        this.openHooks.getAll().forEach(f => f(event));
    }

    onMessage(event: MessageEvent<any>): void {
        if (config.mode === "development") {
            console.log(event)
        }
        this.messageHooks.getAll().forEach(f => f(event));
    }

    onClose(event: CloseEvent): void {
        if (config.mode === "development") {
            console.log('connection closed')
        }

        this.closeHooks.getAll().forEach(f => f(event));
    }

    onError(event: Event): void {
        this.errorHooks.getAll().forEach(f => f(event));
    }

    sendPacket(data: any): void {
        if (typeof data === "string") {
            let noJsonData = JSON.parse(data);
            data = JSON.stringify(noJsonData);
        }
        this.ws.send(typeof data === "string" ? data : JSON.stringify(data))
    }

    joinRoom(id: number): void {
        this.sendPacket({ type: "join", room_id: id });
    }
}

export default Client;