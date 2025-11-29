const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Recipes']
  try {
    const result = await mongodb
      .getDatabase()
      .db("Project2")
      .collection("recipes")
      .find();

    const recipes = await result.toArray();
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch recipes", details: error.message });
  }
};

const getByID = async (req, res) => {
  //#swagger.tags=['Recipes']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const recipeId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db("Project2")
      .collection("recipes")
      .findOne({ _id: recipeId });

    if (!result) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch recipe", details: error.message });
  }
};

const createRecipe = async (req, res) => {
  //#swagger.tags=['Recipes']
  try {
    const recipe = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
    };

    // Simple validation
    if (!recipe.name || !recipe.category) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, category" });
    }

    const response = await mongodb
      .getDatabase()
      .db("Project2")
      .collection("recipes")
      .insertOne(recipe);

    if (response.acknowledged) {
      return res.status(201).json({
        message: "Recipe created successfully",
        recipeId: response.insertedId,
      });
    }

    res.status(500).json({ error: "Failed to create recipe" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error creating recipe", details: error.message });
  }
};

const updateRecipe = async (req, res) => {
  //#swagger.tags=['Recipes']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const recipeId = new ObjectId(req.params.id);

    const recipe = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
    };

    const response = await mongodb
      .getDatabase()
      .db("Project2")
      .collection("recipes")
      .replaceOne({ _id: recipeId }, recipe);

    if (response.modifiedCount > 0) {
      return res.status(200).json({
        message: "Recipe updated successfully",
        modifiedCount: response.modifiedCount,
      });
    }

    res.status(404).json({ error: "Recipe not found or no changes made" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update recipe", details: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  //#swagger.tags=['Recipes']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const recipeId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db("Project2")
      .collection("recipes")
      .deleteOne({ _id: recipeId });

    if (response.deletedCount > 0) {
      return res.status(200).json({
        message: "Recipe deleted successfully",
        deletedCount: response.deletedCount,
      });
    }

    res.status(404).json({ error: "Recipe not found" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete recipe", details: error.message });
  }
};

module.exports = {
  getAll,
  getByID,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
