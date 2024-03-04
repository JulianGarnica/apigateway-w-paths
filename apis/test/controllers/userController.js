//Const of module required
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/index");
const config = require("../../../config.json")["development"];

const SECRET_KEY = config.secret_key;
const User = db.User;

class UserController {
  static async test(req, res) {
    res.status(200).json({ message: "pong!" });
  }

  static async register(req, res) {
    console.log(req.user);
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, nit, name, password } = req.body;

    try {
      // Check if the user already exists
      User.sync().then(function () {
        User.findOne({ where: { email: email } })
          .then(async function (data) {
            if (data) {
              return res.status(400).json({ error: "User already exists" });
            } else {
              // Hash the password
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(password, salt);
              // Create a new user
              User.create({
                email: email,
                nit: nit,
                name: name,
                password: hashedPassword,
              });
              // Respond with success
              res.status(201).json({ message: "User registered successfully" });
            }
          })
          .catch(async (error) => {
            console.log(error);
            res.status(500).json({ message: "Server error" });
          });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async login(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Fetch the user from the database
      User.sync().then(function () {
        User.findOne({ where: { email: email } })
          .then(async function (data) {
            // Check if the password matches
            bcrypt.compare(password, data.password, function (err, response) {
              if (err) {
                // handle error
                console.log("Error!", err);
                return res.status(500).json({ error: "Server error" });
              }
              if (response) {
                // Generate access token
                const accessToken = jwt.sign(
                  { userId: data.id, name: data.name },
                  SECRET_KEY,
                  {
                    expiresIn: "15m",
                  }
                );
                // Generate refresh token (you can also save this in the database)
                const refreshToken = jwt.sign({ userId: data.id }, SECRET_KEY, {
                  expiresIn: "7d",
                });
                // Respond with tokens
                return res.status(200).json({ accessToken, refreshToken });
              } else {
                return res.status(401).json({ error: "Invalid credentials" });
              }
            });
          })
          .catch((error) => {
            return res.status(401).json({ error: "Invalid credentials" });
          });
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }
}
module.exports = UserController;
