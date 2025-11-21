const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Review']
  const result = await mongodb
    .getDatabase()
    .db("Project2")
    .collection("review")
    .find();
  result.toArray().then((reviews) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(reviews);
  });
};

const getByID = async (req, res) => {
  //#swagger.tags=['Review']
  const reviewsId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db("Project2")
    .collection("review")
    .find({ _id: reviewsId });
  result.toArray().then((reviews) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(reviews[0]);
  });
};

const createReview = async (req, res) => {
  //#swagger.tags=['Review']
  const review = {
    recipeId: req.body.recipeId,
    userName: req.body.userName,
    rating: req.body.rating,
    comment: req.body.comment,
    date: req.body.date
  };

  const response = await mongodb
  .getDatabase()
  .db("Project2")
  .collection('review')
  .insertOne(review);

  if (response.acknowledged) {
    res.status(201).json({
      message: 'Review created successfully',
      contactId: response.insertedId,
    });
  }
}

const updateReview = async (req, res) => {
  //#swagger.tags=['Review']
  const reviewId = new ObjectId(req.params.id);
  const review = {
    recipeId: req.body.recipeId,
    userName: req.body.userName,
    rating: req.body.rating,
    comment: req.body.comment,
    date: req.body.date
  };
  const response = await mongodb
  .getDatabase()
  .db("Project2")
  .collection('review')
  .replaceOne({ _id: reviewId }, review);

  if (response.acknowledged) {
    res.status(200).json({
      message: 'Review updated successfully',
      modifiedCount: response.modifiedCount,
    });
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the review.');
  }
}

const deleteReview = async (req, res) => {
  //#swagger.tags=['Review']
  const reviewId = new ObjectId(req.params.id);

  const response = await mongodb
  .getDatabase()
  .db("Project2")
  .collection('review')
  .deleteOne({ _id: reviewId });

  if (response.acknowledged) {
    res.status(200).json({
      message: 'Review deleted successfully',
      deletedCount: response.deletedCount,
    });
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the Review.');
  }
}

module.exports = {
  getAll,
  getByID,
  createReview,
  updateReview,
  deleteReview
};
