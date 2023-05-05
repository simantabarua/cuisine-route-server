const express = require("express");
const cors = require("cors");

const chefData = require("./data/cuisineData.json");
const reviewData = require("./data/userReviewData.json");
const featuredRecipeData = require("./data/featuredRecipeData.json");
const app = express();
const port = 3000;

//get single chef data
const getSingleChef = (chefId) => {
  const chef = chefData.find((c) => c.id === chefId);
  return chef;
};
//get single recipe
const getSingleRecipe = (id) => {
  const chefObject = chefData.find((chef) =>
    chef?.recipes?.find((recipe) => recipe?.recipeId === id)
  );
  // Find the target recipe within the chef object
  const recipeObject = chefObject.recipes.find(
    (recipe) => recipe.recipeId === id
  );
  return recipeObject;
};
//
const getAllRecipes = () => {
  let recipesArray = [];
  for (chef of chefData) {
    for (recipe of chef.recipes) {
      recipesArray.push(recipe);
    }
  }
  return recipesArray;
};

app.use(cors());
app.get("/", (_, res) => {
  res.send("Cuisine Route sever is running");
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
app.get("/single-recipe/:id", async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await getSingleRecipe(recipeId);
    res.send(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/recipes", (req, res) => {
  const recipes = getAllRecipes();
  res.send(recipes);
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
