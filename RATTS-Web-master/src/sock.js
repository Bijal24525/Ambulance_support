import io from "socket.io-client";
const socket = io("/");
const data = {
  name: "jsnf",
  age: "12",
  gender: "male",
};
const name = "harry";
export function connect() {
  socket.on("connect", function () {
    socket.emit("json", data);
  });
  // socket.on("message", function (msg) {
  //   console.log("Received message: ", msg);
  // });
  socket.on("json", function (json) {
    console.log(json);
  });
}
