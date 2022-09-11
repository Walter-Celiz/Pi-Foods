const { Router } = require("express");
const router = Router();
const { getAllDiets } = require("../../controllers/dietController");

//all this routes start with "/diets"
router.get("/", getAllDiets);

module.exports = router;
