const { Router } = require("express");
const router = Router();
const {
    getAllRecipesOrName,
    getApiRecipeById,
    createRecipe,
} = require("../../controllers/recipeController");

//all this routes start with "/recipes"
router.get("/", getAllRecipesOrName);
router.get("/:id", getApiRecipeById);
router.post("/", createRecipe);

module.exports = router;
