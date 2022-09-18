const { Router } = require("express");
const router = Router();
const {
    getAllRecipesOrName,
    getRecipeById,
    createRecipe,
} = require("../../controllers/recipeController");

//all this routes start with "/recipes"
router.get("/", getAllRecipesOrName);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);

module.exports = router;
