const { Router } = require("express");
const dietRoutes = require("./middlewares/dietRoutes");
const recipeRoutes = require("./middlewares/recipeRoutes");

const router = Router();

router.use("/diets", dietRoutes);
router.use("/recipes", recipeRoutes);

module.exports = router;
