import * as Colyseus from "colyseus.js";

export class WebSocketPlagin extends Phaser.Plugins.BasePlugin {
    public client: Colyseus.Client;

    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);
        this.client = new Colyseus.Client("ws://localhost:2567");
        this.Connect();
    }

    async Connect() {
        try {
            const room = await this.client.joinOrCreate("my_room", {
                
            });
            console.log("joined successfully", room);
        } catch (e) {
            console.error("join error", e);
        }
    }

    init() {
        console.log("Plugin is alive");
    }
}
