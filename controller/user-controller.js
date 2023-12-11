const { users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

class UserController {
  static async register(req, res, next) {
    try {
      const { id, email, gender, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await users.create({
        id,
        email,
        gender,
        password: hashedPassword,
        role,
      });
      res.status(201).json({ status: "success", message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await users.findOne({ where: { email } });
      if (!user) {
        throw { name: "InvalidCredential" };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw { name: "InvalidCredential" };
      }
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          gender: user.gender,
          password: user.password,
          role: user.role,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ status: "success", message: "Logged in successfully" , token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
