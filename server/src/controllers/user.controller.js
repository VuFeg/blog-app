import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const salt = bcrypt.genSaltSync(10);
const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, salt),
    });
    res.status(200).json(userDoc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const secret = "sadioajsdioashdoiashdioashdioas";
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const check = bcrypt.compareSync(password, userDoc.password);

    if (check) {
      jwt.sign({ username, id: userDoc._id }, secret, (err, token) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          res.cookie("token", token).json({ message: "Login success", token });
        }
      });
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { register, login };
