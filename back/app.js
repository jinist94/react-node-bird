const express = require("express");
const postRouter = require("./routes/post");

const app = express(); // express 호출
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get("/api", (req, res) => {
  res.send("hello api");
});

app.get("/api/posts", (req, res) => {
  res.json([
    { id: 1, content: "hello" },
    { id: 2, content: "hello2" },
    { id: 3, content: "hello3" },
  ]);
});

app.use("/post", postRouter);

app.listen(port, () => {
  console.log("Server start");
});
