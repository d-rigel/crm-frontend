const express = require("express");
const { insertUser, getUserByEmail } = require("../model/user/User.model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const router = express.Router();

router.all("/", (req, res, next) => {
  // res.json({ message: "return form user router" });
  next();
});

router.post("/", async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;
  try {
    //hash password
    const hashedPass = await hashPassword(password);

    const newUserObj = {
      name,
      company,
      address,
      phone,
      email,
      password: hashedPass,
    };

    // const result = await insertUser(req.body);
    const result = await insertUser(newUserObj);
    console.log(result);
    res.json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

//User sign in Router
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  //hash our password and compare with the db one
  if (!email || !password) {
    return res.json({ message: "error", status: "Invalid form submission" });
  }

  //get user with email from db

  const user = await getUserByEmail(email);
  console.log(user);

  const pwFrmDb = user && user._id ? user.password : null;

  if (!pwFrmDb)
    return res.json({ status: "error", message: "invalid email or password" });

  const result = await comparePassword(password, pwFrmDb);
  console.log(result);

  res.json({ status: " success", message: "Login Successfully!" });
});

module.exports = router;
