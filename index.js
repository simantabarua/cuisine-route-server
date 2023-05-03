const express = require("express");
const cors = require("cors");

const chefData = require("./cuisineData.json");

const app = express();
const port = 3000;

const getSingleChef = (chefId) => {
  const chef = chefData.find((c) => c.id === chefId);
  return chef;
};
const getChefRecipe = (chefId) => {
  const chef = chefData.find((c) => c.id === chefId);
  return chef.recipes;
 
};
getChefRecipe("c7e2f4d6a9b1");

app.use(cors());
app.get("/", (_, res) => {
  res.send("sever is running");
});

app.get("/chefData", (_, res) => {
  res.send(chefData);
});
app.get("/chef/:id", (req, res) => {
  const id = req.params.id;
  const chef = getSingleChef(id);
  res.send(chef);
});
app.get("/recipes/:id", (req, res) => {
  const id = req.params.id;
  const recipes = getChefRecipe(id);
  res.send(recipes);
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
