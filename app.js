const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require("./postBank");
const timeAgo = require("node-time-ago");
const postList = require("./views/postList");
const postDetails = require("./views/postDetails");
const pageNotFound = require("./views/pageNotFound");

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  const posts = postBank.list();
  res.send(postList(posts, timeAgo));
});

app.get("/posts/:id", (req, res) => {
  const post = postBank.find(req.params.id);
  res.send(postDetails(post, timeAgo));
});

app.get("*", (req, res) => {
  res.send(pageNotFound());
});

const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
