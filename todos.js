const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const app = express();

function newRecord(title, description) {
  return { title, description };
}

function randomString() {
  let b = Buffer.alloc(15);
  crypto.randomFillSync(b);
  return b.toString("hex");
}

/***
 * The currently loaded Key-Value pairs
 */
const kv = fs.existsSync("./records.json")
  ? JSON.parse(
      fs.readFileSync("./records.json", { options: { encoding: "UTF-8" } })
    )
  : {};

//we need json parsers
app.use(express.json());

/**
 * Endpoint /:id
 * -> get record with provided id
 */
app.get("/:id", (req, res) => {
  const { id } = req.params;
  if (kv[id] === undefined) {
    res
      .status(404)
      .json({ message: `key ${id} not found` })
      .end();
    return;
  }
  res.status(200).json({ message: "ok", value: kv[id] }).end();
});

/**
 * Endpoint /
 * -> get the data stored in the entire dataset
 */
app.get("/", (req, res) => {
  res
    .status(200)
    .json({
      message: "ok",
      data: Object.keys(kv).map((z) => {
        return Object.assign({ id: z }, kv[z]);
      }),
    })
    .end();
});

/**
 * Endpoint / POST
 * ->set the KV
 * params: {
 *  title:string //title
 *  description:string //description
 * }
 */
app.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: "Invalid request" }).end();
    return;
  }
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ message: "Parameter missing" }).end();
    return;
  }
  const id = randomString();
  kv[id] = newRecord(title, description);
  res.status(201).json({ message: "stuff created", id }).end();
});
/**
 * Endpoint /:id DELETE
 * -> delete the entry with id
 */
app.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (kv[id] === undefined) {
    res.status(404).json({ message: `not found` }).end();
  } else {
    kv[id] = undefined;
    res.status(200).json({ message: "Deleted" }).end();
  }
});

app.patch("/:id", (req, res) => {
  const { id } = req.params;
  const handle = kv[id];
  if (handle === undefined) {
    res.status(404).json({ message: `not found` }).end();
  } else {
    const names = ["title", "description"];
    if (names.reduce((p, v) => p && req.body[v] === undefined, true)) {
      res.status(400).json({ message: "Parameter missing" }).end();
      return;
    }
    names.forEach((z) => {
      const v = req.body[z];
      if (v !== undefined) {
        handle[z] = v;
      }
    });
    res.status(200).json({ message: "Updated" }).end();
  }
});

app.put("/:id", (req, res) => {
  const { id } = req.params;
  if (kv[id] === undefined) {
    res.status(404).json({ message: `not found` }).end();
  } else {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ message: "Parameter missing" }).end();
      return;
    }
    const id = randomString();
    kv[id] = newRecord(title, description);
    res.status(200).json({ message: "stuff update", id }).end();
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "endpoint not found" }).end();
});

function sync() {
  let stuffs = JSON.stringify(kv);
  fs.writeFileSync("./records.json", stuffs);
}
setInterval(sync, 20000);
process.on("exit", sync);
module.exports = app;
