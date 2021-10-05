const jwt = require("jsonwebtoken");
const config = require("config");
const { setJWT, getJWT } = require("./redis.helper");
const { storeUserRefreshJWT } = require("../model/user/User.model");

const JWT_ACCESS_SECRET = config.get("JWT_ACCESS_SECRET");
const JWT_ACCESS_SECRET_FRESH = config.get("JWT_ACCESS_SECRET_FRESH");

const createAccessJWT = async (email, _id) => {
  try {
    const accessJWT = await jwt.sign({ email }, JWT_ACCESS_SECRET, {
      expiresIn: "1m",
    });
    await setJWT(accessJWT, _id);

    return Promise.resolve(accessJWT);
  } catch (error) {
    return Promise.resolve(error);
  }
};

const createRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, JWT_ACCESS_SECRET_FRESH, {
      expiresIn: "30d",
    });

    await storeUserRefreshJWT(_id, refreshJWT);

    return Promise.resolve(refreshJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

const verifyAccessJWT = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, JWT_ACCESS_SECRET));
  } catch (error) {
    return Promise.resolve(error);
  }
};

const verifyRefreshJWT = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, JWT_ACCESS_SECRET_FRESH));
  } catch (error) {
    return Promise.resolve(error);
  }
};

module.exports = {
  createAccessJWT,
  createRefreshJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
};
