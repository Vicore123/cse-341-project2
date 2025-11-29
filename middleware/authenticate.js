const isAuthenticated = (req, res, next) => {
  console.log("AUTH MIDDLEWARE RUNNING");
  console.log("req.user:", req.user);

  if (!req.user) {
    return res.status(401).json({ error: "You do not have access." });
  }

  next();
};

module.exports = { isAuthenticated };
