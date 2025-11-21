const express = require("express");
const router = express.Router();

const ReviewsController = require("../controllers/reviews");

router.get("/", ReviewsController.getAll);

router.get("/:id", ReviewsController.getByID);

router.post("/", ReviewsController.createReview);

router.put("/:id", ReviewsController.updateReview);

router.delete("/:id", ReviewsController.deleteReview);

module.exports = router;