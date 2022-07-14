const express = require("express");
const app = express();
app.use("/kv", require("./kv.js"));
app.use("/todos", require("./todos.js"));
app.use((req, res) => {
  res.status(200).end("This is the demo server. See README.md for more info");
});
app.listen(8080);
console.log("Server mounted at localhost:8080");
