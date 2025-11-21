const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Recipes']
  const result = await mongodb
    .getDatabase()
    .db("Project2")
    .collection("recipes")
    .find();
  result.toArray().then((recipes) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(recipes);
  });
};

const getByID = async (req, res) => {
  //#swagger.tags=['Recipes']
  const recipeId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db("Project2")
    .collection("recipes")
    .find({ _id: recipeId });
  result.toArray().then((recipes) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(recipes[0]);
  });
};

const createRecipe = async (req, res) => {
  //#swagger.tags=['Recipes']
  const recipe = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    ingredients: req.body.ingredients,    
    instructions: req.body.instructions,    
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime
  };
  const response = await mongodb
  .getDatabase()
  .db("Project2")
  .collection('recipes')
  .insertOne(recipe);

  if (response.acknowledged) {
    res.status(201).json({
      message: 'Recipe created successfully',
      contactId: response.insertedId,
    });
  }
}

const updateRecipe = async (req, res) => {
  //#swagger.tags=['Recipes']
  const recipeId = new ObjectId(req.params.id);
  const recipe = {
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    ingredients: req.body.ingredients,    
    instructions: req.body.instructions,    
    prepTime: req.body.prepTime,
    cookTime: req.body.cookTime
  };
  const response = await mongodb
  .getDatabase()
  .db("Project2")
  .collection('recipes')
  .replaceOne({ _id: recipeId }, recipe);

  if (response.acknowledged) {
    res.status(200).json({
      message: 'Recipe updated successfully',
      modifiedCount: response.modifiedCount,
    });
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the recipe.');
  }
}

const deleteRecipe = async (req, res) => {
  //#swagger.tags=['Recipes']
  const recipeId = new ObjectId(req.params.id);

  const response = await mongodb
  .getDatabase()
  .db("Project2")
  .collection('recipes')
  .deleteOne({ _id: recipeId });

  if (response.acknowledged) {
    res.status(200).json({
      message: 'Recipe deleted successfully',
      deletedCount: response.deletedCount,
    });
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the Recipe.');
  }
}

module.exports = {
  getAll,
  getByID,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
