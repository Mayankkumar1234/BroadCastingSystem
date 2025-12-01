import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);

app.use(cors({ origin: "*" }));
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});
const PORT = 3000;
const HOST = "192.168.1.8";

// console.log(join(_dirname, "public/index.html"));

app.get("/", (req, res) => {
  res.send("Working fine...");
  console.log("HTTP hits from the client");
});

let tasks = [];
let taskId = 1;
const PROVIDER_ROOM = "provider-room";
const USER_ROOM = "user-room";

const userMap = new Map();

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  //  socket.emit("taskList", taskList)

  socket.on("register-role", (details) => {
    const { role } = details;
    const id = details?.id;
    // console.log(id);
    const room = role === "Provider" ? PROVIDER_ROOM : USER_ROOM;

    socket.join(room);

    if (role === "User" || role === "Provider") {
      userMap.set(id, { socketId: socket.id, role });
      socket.emit("role-registration-success", {
        id: id,
        role: role,
        message: `Successfully registered as ${role}. You are now ready to receive updates.`,
      });
    }

    // console.log(room, id);
  });
  socket.on("newTask", (taskDetails) => {
    const { id, title, selectValue } = taskDetails;
    const newTask = {
      tid: taskId++,
      userId: id,
      title: title,
      category: selectValue,
      status: "Pending",
      acceptedBy: null,
    };
    // console.log(newTask);
    const socketid = userMap.get(newTask.userId);
    console.log(socketid);
    let sid = socketid?.socketId;
    // console.log(sid);
    // console.log(socketid);
    tasks.push(newTask);
    io.to(PROVIDER_ROOM).emit("new-task", newTask);
    io.to(sid).emit("user-task-updated", newTask);
  });
  socket.on("acceptTask", ({ tid, providerId }) => {
    let currTask = tasks.findIndex(
      (t) => t.tid === tid && t.status === "Pending"
    );
    // console.log(tasks[currTask]);
    if (currTask !== -1) {
      tasks[currTask].status = "Accepted";
      tasks[currTask].acceptedBy = providerId;

      const acceptedTask = tasks[currTask];
      let sid = userMap.get(acceptedTask.userId).socketId;
      console.log(sid);
      let alltasks = tasks.filter((t) => t.userId === acceptedTask.userId);

      console.log(alltasks);
      io.to(sid).emit("acceptedTaskL", alltasks);
      let pendingTasks = tasks.filter(
        (t) => t.status === "Pending" || t.providerId === providerId
      );
      io.to(PROVIDER_ROOM).emit("pending-tasks", pendingTasks);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://${"0.0.0.0"}:${PORT}`);
});
