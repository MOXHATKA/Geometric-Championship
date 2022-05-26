import express, { Request, Response } from "express";
import socket from "socket.io";
import http from "http";
import {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from "./socket.interface";

const port = 5000;
const app = express();
const server = http.createServer(app);
const io = new socket.Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server, {
    cors: {
      origin: "http://localhost:5000",
      credentials: true
    }
});
app.use(express.static(__dirname + "/../public"));

io.on("connection", (socket) => {
    socket.join("room1");
    socket.emit("noArg");
    socket.emit("basicEmit", 1, "2", Buffer.from([3]));
    socket.emit("withAck", "4", (e) => {
       console.log("withAck");
    });

    // works when broadcast to all
    io.emit("noArg");

    // works when broadcasting to a room
    io.to("room1").emit("basicEmit", 1, "2", Buffer.from([3]));
});
io.on("connection", (socket) => {
    socket.on("hello", () => {
        // ...
    });
});

app.get("/", (req: Request, res: Response) => {
    res.send("The sedulous hyena ate the antelope!");
});
server.listen(port, () => {
    console.log("listen port " + port);
});
