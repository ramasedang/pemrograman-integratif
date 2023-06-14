import express from "express";
import http from "http";
import socketIO from "socket.io";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// The map object to hold the username of each socket
const usernameMap = new Map();

app.use(express.static(path.join(__dirname, "./public")));

app.get("/", sendIndexFile);

function sendIndexFile(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
}

io.on("connection", handleConnection);

function handleConnection(socket) {
  console.log("New user connected");

  socket.on("joining msg", username => handleJoining(socket, username));
  socket.on("disconnect", () => handleDisconnect(socket));
  socket.on("chat message", msg => handleChatMessage(socket, msg));
}

function handleJoining(socket, username) {
  usernameMap.set(socket.id, username);
  io.emit("chat message", `---${username} joined the chat---`);
}

function handleDisconnect(socket) {
  const username = usernameMap.get(socket.id);
  console.log("User disconnected");
  io.emit("chat message", `---${username} left the chat---`);
  usernameMap.delete(socket.id);
}

function handleChatMessage(socket, msg) {
  socket.broadcast.emit("chat message", msg); //sending message to all except the sender
}

server.listen(3000, () => {
  console.log("Server listening on :3000");
});
