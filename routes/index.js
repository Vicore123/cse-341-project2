const router = require("express").Router();
const passport = require("passport");

router.use("/", require("./swagger"));
router.use("/recipes", require("./recipes"));
router.use("/reviews", require("./reviews"));

router.get("/login", passport.authenticate("github"));

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
