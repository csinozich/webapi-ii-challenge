const express = require("express");
const helmet = require("helmet");

const Router = require("./router.js");

const server = express();

server.use(express.json());
server.use("/api/posts", Router);
server.use(helmet());

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda</h>
    <p>Welcome to the Lambda</p>
  `);
});

module.exports = server;
