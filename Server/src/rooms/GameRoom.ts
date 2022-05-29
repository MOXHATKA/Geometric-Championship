import { Room, Client } from "colyseus";
import { Player, State } from "./schema/GameState";

export class GameRoom extends Room<State> {
    onCreate(options: any) {
        this.setState(new State());
        this.onMessage("send_position", (client, message) => {
            const player = this.state.players.get(client.sessionId);
            player.x = message.x;
            player.y = message.y;
            this.broadcast(
                "updatePosition",
                {
                    id: client.sessionId,
                    x: player.x,
                    y: player.y,
                },
                { except: client }
            );
        });
    }

    onJoin(client: Client, options: any) {
        console.debug(options);
        this.state.players.set(client.sessionId, new Player());
        this.broadcast(
            "joinPlayer",
            { id: client.sessionId },
            { except: client }
        );
        var players: any[] = [];
        this.state.players.forEach((elemet, key) => {
            if (key == client.sessionId) return;
            players.push({ key: key, x: elemet.x, y: elemet.y });
        });
        client.send("updatePlayers", { players: players });
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
