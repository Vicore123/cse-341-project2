const express = require("express");
const router = express.Router();

const ReviewsController = require("../controllers/reviews");

const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", ReviewsController.getAll);
router.get("/:id", ReviewsController.getByID);
router.post("/", isAuthenticated, ReviewsController.createReview);
router.put("/:id", isAuthenticated, ReviewsController.updateReview);
router.delete("/:id", isAuthenticated, ReviewsController.deleteReview);

module.exports = router;
