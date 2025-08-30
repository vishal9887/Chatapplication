import express from "express";
import cors from "cors";
import http from "http";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// create express app and http server
const app = express();
const server = http.createServer(app);

//initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

//store online user
export const userSocketMap = {};

//Socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  //Emit online users to all connected client
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//middleware
app.use(express.json({ limit: "4mb" }));
app.use(
  cors({
    origin: "https://web-chat-app-gamma.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

//routes setup
app.use("/api/status", (req, res) => res.send("Server is live."));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

//database connection
await connectDB();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

//export server for vercel
export default server;
