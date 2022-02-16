const express = require("express");
const ws = require("ws");
const bodyParser = require("body-parser");
const app = express();
//const port = process.env.PORT;
const port = 9000;
const cors = require("cors");
const maria = require("./model/index.js");
const Admin = require("./routes/Admin");

app.use(cors({ origin: true, credentials: true }));

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "10mb"
  })
);
app.use(bodyParser.json());

app.use("/api/admin", Admin);

const HTTPServer = app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

maria.connect(err => {
  if (err) throw err;
  console.log("Maria DB Connected..");
  let testsql = "select * from admin;";
  maria.query(testsql, function (err, result) {
    if (err) throw err;
    console.log(result[0]);
  });
});

const webSocketServer = new ws.Server({
  server: HTTPServer
});

webSocketServer.on("connection", (ws, request) => {
  //1. 연결 클라이언트 ip 취득
  const ip =
    request.headers["x-forwarded-for"] || request.connection.remoteAddress;
  console.log(`새로운 클라이언트[${ip}] 접속`);

  //2. 클라이언트에게 메시지 전송
  if (ws.readyState === ws.OPEN) {
    ws.send(`클라이언트[${ip}] 접속중`);
  }

  //3. 클라이언트로부터 메시지 수신 이벤트 처리
  ws.on("message", msg => {
    console.log(`클라이언트[${ip}]에게 수신한 메시지 : ${msg}`);
  });

  //4. 에러 처리
  ws.on("error", error => {
    console.log(`클라이언트[${ip}] 연결 에러발생 : ${error}`);
  });

  //5. 연결 종료 이벤트 처리
  ws.on("close", () => {
    console.log(`클라이언트[${ip}] 웹소켓 연결 종료`);
  });
});
