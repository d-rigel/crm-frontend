const express = require("express");
const router = express.Router();
const { getUserByEmail } = require("../model/user/User.model");

const { verifyRefreshJWT, createAccessJWT } = require("../helpers/jwt.helper");
const config = require("config");
const JWT_REFRESH_SECRET_EXP_DAY = config.get("JWT_REFRESH_SECRET_EXP_DAY");

//returns refresh jwt
router.get("/", async (req, res, next) => {
  const { authorization } = req.headers;

  //1. make sure the token is valid
  const decoded = await verifyRefreshJWT(authorization);
  if (decoded.email) {
    //2. check if the jwt is exist in database
    const userProfile = await getUserByEmail(decoded.email);
    if (userProfile._id) {
      //   res.status(403).json({ message: userProfile });
      let tokenExp = userProfile.refreshJWT.addedAt;
      const dBrefreshToken = userProfile.refreshJWT.token;

      tokenExp = tokenExp.setDate(
        tokenExp.getDate() + +JWT_REFRESH_SECRET_EXP_DAY
      );
      console.log(new Date(tokenExp));

      const today = new Date();

      if (dBrefreshToken !== authorization && tokenExp < today) {
        //3. check if it is not expired
        return res.status(403).json({ message: "Forbidden" });
      }

      const accessJWT = await createAccessJWT(
        decoded.email,
        userProfile._id.toString()
      );

      //delete old token from redis db

      return res.json({ status: "success", accessJWT });
    }
  }
  res.status(403).json({ message: "Forbidden" });
});

module.exports = router;
