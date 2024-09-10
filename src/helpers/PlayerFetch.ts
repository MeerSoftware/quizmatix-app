import DataInterface from "@/interfaces/DataInterface";

function PlayerFetch(players: DataInterface[], id: number) {
    return players.find((player) => player["id"] == id);
}

export default PlayerFetch;