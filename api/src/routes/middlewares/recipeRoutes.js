const { Router } = require("express");
const router = Router();
const {
    getAllRecipesOrName,
    getApiRecipeById,
    // getDbById,
    createRecipe
} = require("../../controllers/recipeController");

//all this routes start with "/recipes"
router.get("/", getAllRecipesOrName);
router.get("/:id", getApiRecipeById);
// router.get("/:id", getDbById);
router.post("/", createRecipe);

module.exports = router;
