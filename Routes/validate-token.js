const jwt = require("jsonwebtoken");
// middleware to validate token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  console.log('validate token')
  console.log(token)
if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET, (err,decoded) => {
      // if(decoded.id === req.body.id)
      if(decoded.email !== req.body.email){
        res.status(400).json({ error: "Token is not valid" });
      }
    });
    req.user = verified;
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
};
module.exports = verifyToken;