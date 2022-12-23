const jwt = require("jsonwebtoken");

const user = require("./models/user.model.js");

module.exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.User = await user.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      console.log(error);
    }
  }

  if (!token) {
    res.status(401);
    console.log(error);
  }
};
