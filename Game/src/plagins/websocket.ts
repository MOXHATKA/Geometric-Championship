import * as Colyseus from "colyseus.js";

export class WebSocketPlugin extends Phaser.Plugins.BasePlugin {
    public client: Colyseus.Client;

    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);
        this.client = new Colyseus.Client("ws://localhost:2567");
    }

    async Connect(data: any): Promise<Colyseus.Room<any>> {
        try {
            const room = await this.client.joinOrCreate("my_room", data);
            return room;
        } catch (e) {
            console.error("join error", e);
            throw(e)
        }
    }

    init() {
        console.log("Plugin is alive");
    }
}
