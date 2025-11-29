const express = require("express");
const router = express.Router();

const RecipesController = require("../controllers/recipes");

const { isAuthenticated } = require('../middleware/authenticate');

router.get("/", RecipesController.getAll);
router.get("/:id", RecipesController.getByID);
router.post("/", isAuthenticated, RecipesController.createRecipe);
router.put("/:id", isAuthenticated, RecipesController.updateRecipe);
router.delete("/:id", isAuthenticated, RecipesController.deleteRecipe);

module.exports = router;