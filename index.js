const express = require("express");
const cors = require("cors");

const chefData = require("./data.json");

const app = express();
const port = 3000;

app.use(cors());
app.get("/", (_, res) => {
  res.send("sever is running");
});

app.get("/chefData", (_, res) => {
  res.send(chefData);
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
