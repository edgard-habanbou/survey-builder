const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ message: "all fields are required" });
    return;
  }
  const user = await User.findOne({ username });
  if (!user) {
    res.status(400).send({ message: "Invalid username/password" });
    return;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(400).send({ message: "Invalid username/password" });
    return;
  }
  const { password: hashedPassword, _id, ...userDetails } = user.toJSON();

  // generate JWT token
  const token = jwt.sign(
    {
      ...userDetails,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2 days" }
  );

  res.status(200).send({
    user: userDetails,
    token,
  });
};

const register = async (req, res) => {
  const { username, password, fname, lname, admin } = req.body;
  if (!username || !password || !fname || !lname) {
    res.status(400).send({ message: "all fields are required" });
    return;
  }

  try {
    const user = new User({
      username,
      password,
      fname,
      lname,
      admin,
    });

    await user.save();

    res.status(200).send({ user });
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

module.exports = {
  login,
  register,
};
