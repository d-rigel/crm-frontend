const { verifyAccessJWT } = require("../helpers/jwt.helper");
const { getJWT, deleteJWT } = require("../helpers/redis.helper");

const UserAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  //1. verify if jwt is valid
  const decoded = await verifyAccessJWT(authorization);
  console.log(decoded);
  if (decoded.email) {
    const userId = await getJWT(authorization);
    console.log(userId);

    if (!userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.userId = userId;
    return next();
  }

  deleteJWT(authorization);

  return res.status(403).json({ message: "Forbidden" });

  //2. check if jwt is exist in redis
};

module.exports = {
  UserAuthorization,
};
