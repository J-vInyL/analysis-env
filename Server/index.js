const express = require("express");
require("./config/env.js");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});
const cors = require("cors");
const maria = require("./model/DB_index.js");
const Admin = require("./routes/Admin");
const User = require("./routes/User");

app.use(cors({ origin: true, credentials: true }));

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "10mb"
  })
);
app.use(bodyParser.json());

// const HTTPServer = app.listen(port, () => {
//   console.log(`server listening on port ${port}`);
// });

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

maria.connect(err => {
  if (err) throw err;
  console.log("Maria DB Connected..");
});

io.on("connection", socket => {
  const req = socket.request;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(`새로운 클라이언트[${ip}] 접속`, socket.id);

  //연결 종료 시
  socket.on("disconnect", () => {
    console.log("클라이언트 접속 해제", ip, socket.id);
    clearInterval(socket.interval);
  });

  //에러 시
  socket.on("error", error => {
    console.error(error);
  });
  // 관리자 공자 생성 후 MainPage에 Websocket으로 보내기
  socket.on("Identifier", data => {
    io.emit("electron-Identifier", data);
    console.log("receive Data", data);
  });
});

app.use("/api/admin", Admin); //어드민 관련 서비스
app.use("/api/user", User); //유저 관련 서비스
