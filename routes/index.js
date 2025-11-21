const router = require("express").Router();

router.use("/", require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello World')
})

router.use("/recipes", require("./recipes"));

router.use("/reviews", require("./reviews"))

module.exports = router;