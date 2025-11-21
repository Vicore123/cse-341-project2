const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Review']
  try {
    const result = await mongodb
      .getDatabase()
      .db("Project2")
      .collection("review")
      .find();

    const reviews = await result.toArray();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch reviews",
      details: error.message,
    });
  }
};

const getByID = async (req, res) => {
  //#swagger.tags=['Review']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const reviewId = new ObjectId(req.params.id);

    const review = await mongodb
      .getDatabase()
      .db("Project2")
      .collection("review")
      .findOne({ _id: reviewId });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch review",
      details: error.message,
    });
  }
};

const createReview = async (req, res) => {
  //#swagger.tags=['Review']
  try {
    const review = {
      recipeId: req.body.recipeId,
      userName: req.body.userName,
      rating: req.body.rating,
      comment: req.body.comment,
      date: req.body.date,
    };

    // Simple validation
    if (!review.recipeId || !review.userName || !review.rating) {
      return res.status(400).json({
        error: "Missing required fields: recipeId, userName, rating",
      });
    }

    const response = await mongodb
      .getDatabase()
      .db("Project2")
      .collection("review")
      .insertOne(review);

    if (response.acknowledged) {
      return res.status(201).json({
        message: "Review created successfully",
        reviewId: response.insertedId,
      });
    }

    res.status(500).json({ error: "Failed to create review" });
  } catch (error) {
    res.status(500).json({
      error: "Server error creating review",
      details: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  //#swagger.tags=['Review']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const reviewId = new ObjectId(req.params.id);

    const review = {
      recipeId: req.body.recipeId,
      userName: req.body.userName,
      rating: req.body.rating,
      comment: req.body.comment,
      date: req.body.date,
    };

    const response = await mongodb
      .getDatabase()
      .db("Project2")
      .collection("review")
      .replaceOne({ _id: reviewId }, review);

    if (response.modifiedCount > 0) {
      return res.status(200).json({
        message: "Review updated successfully",
        modifiedCount: response.modifiedCount,
      });
    }

    res.status(404).json({ error: "Review not found or no changes made" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update review",
      details: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  //#swagger.tags=['Review']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const reviewId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db("Project2")
      .collection("review")
      .deleteOne({ _id: reviewId });

    if (response.deletedCount > 0) {
      return res.status(200).json({
        message: "Review deleted successfully",
        deletedCount: response.deletedCount,
      });
    }

    res.status(404).json({ error: "Review not found" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete review",
      details: error.message,
    });
  }
};

module.exports = {
  getAll,
  getByID,
  createReview,
  updateReview,
  deleteReview,
};