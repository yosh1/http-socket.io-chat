const http = require("http");
const socketio = require("socket.io");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    var output = fs.readFileSync("./index.html", "utf-8");
    res.end(output);
    console.log('Port:' + PORT);
}).listen(PORT);

var io = socketio.listen(server);

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
