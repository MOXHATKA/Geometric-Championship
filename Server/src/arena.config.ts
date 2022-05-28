import Arena from "@colyseus/arena";
import { uWebSocketsTransport } from "@colyseus/uwebsockets-transport";
import { monitor } from "@colyseus/monitor";

/**
 * Import your Room files
 */
import { MyRoom } from "./rooms/MyRoom";

export default Arena({
    getId: () => "Your Colyseus App",
    displayLogs:true,
    initializeGameServer: (gameServer) => {
        gameServer.define('my_room', MyRoom);

    },
    initializeTransport: (options) => {

        return new uWebSocketsTransport({});
    },

    initializeExpress: (app) => {
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});