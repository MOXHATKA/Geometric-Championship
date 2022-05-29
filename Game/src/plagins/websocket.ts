import * as Colyseus from "colyseus.js";
import Input from "../components/Input";
import PlayerNetTag from "../components/PlayerNetTag";
import Sprite from "../components/Sprite";
import ecs from "../ECSInstance";
import * as PlayerObj from "../objects/Player";

export class WebSocketPlugin extends Phaser.Plugins.BasePlugin {
    public client: Colyseus.Client;
    public playerId!: number;
    players: Map<string, number>;

    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);
        this.client = new Colyseus.Client("ws://localhost:2567");
        this.players = new Map<string, number>();
    }

    async Connect(playerId: number): Promise<Colyseus.Room<any>> {
        try {
            const player = Sprite.sprite[playerId];
            const data = {
                x: player.x,
                y: player.y,
            };
            const room = await this.client.joinOrCreate("my_room", data);
            this.playerId = playerId;
            return room;
        } catch (e) {
            console.error("join error", e);
            throw e;
        }
    }

    SendPosition(room: Colyseus.Room<any>) {
        room.send("send_position", {
            x: Input.x[this.playerId],
            y: Input.y[this.playerId],
        });
    }

    CreatePlayerNet(scene: Phaser.Scene, message: any) {
        const pl = ecs.createEntity();
        this.players.set(message.id, pl);
        const sprite = Sprite;
        const player = new PlayerObj.default(
            scene,
            scene.scale.width / 2,
            scene.scale.height / 2
        );
        player.x = message.x;
        player.y = message.y;
        sprite.sprite[pl] = player;
        ecs.addComponent(pl, Sprite);
        ecs.addComponent(pl, Input);
        ecs.addComponent(pl, PlayerNetTag);
    }

    UpdatePosition(message: any) {
        if (!this.players.has(message.id)) return;
        const player = this.players.get(message.id) as number;
        Input.x[player] = message.x;
        Input.y[player] = message.y;
    }

    UpdatePlayers(message: any, scene: Phaser.Scene) {
        message.players.forEach((element: any) => {
            this.CreatePlayerNet(scene, element);
        });
    }

    init() {
        console.log("Plugin is alive");
    }
}
