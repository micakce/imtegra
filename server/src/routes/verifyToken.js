const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'].split(' ')[1];
  if(!token) {
    return res.status(401).json({
      auth: false,
      message: "No token provided loco"
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id;
    console.log(decoded);
  } catch (err) {
    return res.status(401).json({
      auth: false,
      message: err
    })
  }
  next();
}

module.exports = verifyToken;
