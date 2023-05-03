const express = require("express");
const cors = require("cors");

const chefData = require("./data/cuisineData.json");
const reviewData = require("./data/userReviewData.json");
const featuredRecipeData = require("./data/featuredRecipeData.json");
const app = express();
const port = 3000;

const getSingleChef = (chefId) => {
  const chef = chefData.find((c) => c.id === chefId);
  return chef;
};

app.use(cors());
app.get("/", (_, res) => {
  res.send("sever is running");
});

app.get("/chefData", (_, res) => {
  res.send(chefData);
});
app.get("/user-review", (_, res) => {
  res.send(reviewData);
});
app.get("/featured-recipe", (_, res) => {
  res.send(featuredRecipeData);
});
app.get("/chef/:id", (req, res) => {
  const id = req.params.id;
  const chef = getSingleChef(id);
  res.send(chef);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
