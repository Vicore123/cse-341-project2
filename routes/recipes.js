const express = require("express");
const router = express.Router();

const RecipesController = require("../controllers/recipes");

router.get("/", RecipesController.getAll);

router.get("/:id", RecipesController.getByID);

router.post("/", RecipesController.createRecipe);

router.put("/:id", RecipesController.updateRecipe);

router.delete("/:id", RecipesController.deleteRecipe);

module.exports = router;