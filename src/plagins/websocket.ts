import { io, Socket } from "socket.io-client";

export class WebSocketPlagin extends Phaser.Plugins.BasePlugin {

    public socket : Socket

    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);
        this.socket = io("http://localhost:5000/");
        this.socket.on("noArg", () => {
            console.log("noArh");
        });

        this.socket.on("basicEmit", (a, b, c) => {
            console.log(a, b, c);
        });

        this.socket.on("withAck", (d, callback) => {
            console.log(d);
            callback();
        });
    }

    init() {
     
        console.log("Plugin is alive");
    }
}
