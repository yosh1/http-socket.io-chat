const http = require("http"),
    socketio = require("socket.io"),
    fs = require("fs"),
    PORT = process.env.PORT || 3000;

const server = http.createServer(function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    const output = fs.readFileSync("./index.html", "utf-8");
    res.end(output);
    console.log('Port:' + PORT);
}).listen(PORT);

const io = socketio.listen(server);

io.sockets.on("connection", function (socket) {

    socket.on("messages", function (data) {
        io.sockets.emit("message", {
            value: data.value
        });
    });

    socket.on("broadcasts", function (data) {
        socket.broadcast.emit("messages", {
            value: data.value
        });
    });

    socket.on("disconnect", function () {});
});
