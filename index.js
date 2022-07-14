const express = require("express");
const app = express();
app.use("/kv", require("./kv.js"));
app.use("/todos", require("./todos.js"));
app.listen(8080);
