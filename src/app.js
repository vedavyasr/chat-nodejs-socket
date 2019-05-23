let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let users = [];
let msgs = [];
io.on("connection", socket => {
  console.log("new user connected");
  socket.on("addUser", user => {
   
    users.push(user);
  });
  socket.on("sendMsg", msg => {
    msgs.push(msg);
    io.emit("refreshmsgfeed", msgs);
  });

  socket.on("disconnect", function() {
    console.log("disconnected");
    io.emit("user disconnected");
  });
});

http.listen(3001, () => {
  console.log("Listening on 3001");
});
