const express = require("express");
const fs = require("fs");
const app = express();
/***
 * The currently loaded Key-Value pairs
 */
const kv = fs.existsSync("./kv.json")
  ? JSON.parse(fs.readFileSync("./kv.json", { options: { encoding: "UTF-8" } }))
  : {};

//we need json parsers
app.use(express.json());

/**
 * Endpoint /:name
 * -> get value of the item named key
 */
app.get("/:name", (req, res) => {
  const { name } = req.params;
  if (kv[name] === undefined) {
    res
      .status(404)
      .json({ message: `key ${name} not found` })
      .end();
    return;
  }
  res.status(200).json({ message: "ok", value: kv[name] }).end();
});

/**
 * Endpoint /
 * -> get the data stored in the entire dataset
 */
app.get("/", (req, res) => {
  res.status(200).json({ message: "ok", data: kv }).end();
});

/**
 * Endpoint / POST
 * ->set the KV
 * params: {
 *  key:string //name of the key
 *  value:string //value
 * }
 */
app.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Invalid request" }).end();
    return;
  }
  const { key, value } = req.body;
  if (!key || !value) {
    res.status(400).json({ message: "Parameter missing" }).end();
    return;
  }
  kv[key] = value;
  res.status(201).json({ message: "stuff created", key }).end();
});
/**
 * Endpoint /:name DELETE
 * -> delete the entry named :name
 */
app.delete("/:name", (req, res) => {
  const { name } = req.params;
  if (kv[name] === undefined) {
    res
      .status(404)
      .json({ message: `key ${name} not found` })
      .end();
  } else {
    kv[name] = undefined;
    res.status(200).json({ message: "Deleted" }).end();
  }
});
app.use((req, res) => {
  res.status(404).json({ message: "endpoint not found" }).end();
});

function sync() {
  let stuffs = JSON.stringify(kv);
  fs.writeFileSync("./kv.json", stuffs);
}
setInterval(sync, 20000);
process.on("exit", sync);
module.exports = app;
