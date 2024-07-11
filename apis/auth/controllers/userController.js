//Const of module required
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("../models/index");
const config = require("../../../config.json")["development"];


const SECRET_KEY = config.secret_key;
const User = db.User;
const apps = db.apps;
const AppActions = db.AppActions;
const PermissionsUser = db.PermissionsUser;

class UserController {
  static async test(req, res) {
    res.status(200).json({ message: "pong!" });
  }

  static async register(req, res) {
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
                    expiresIn: "300m",
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

  static async infoUser(req, res) {
    // Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
      res.status(201).json({ user: req.user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }

  static async getAppsUser(req, res){
    PermissionsUser.findAll({
      where: { userid: req.user.id },
      include: [{
        model: AppActions,
        as: "appactions",
        include: [{
          model: apps,
          as: "apps",
          attributes: ['id','nameApps', 'description', 'image', 'url']
        }]
      }]
    //includeIgnoreAttributes: false,
    }).then(result => {
      const resultOrg = result
      // Resultado contiene los nombres filtrados
      const response = result.map(result => ({
        nameApp: result.appactions.apps.nameApps,
        description: result.appactions.apps.description,
        image: result.appactions.apps.image,
        url: result.appactions.apps.url,
        id: result.appactions.apps.id,
        permissions: resultOrg.map(resultPermissions => ({
          path: resultPermissions.appactions.path,
          nameAction: resultPermissions.appactions.nameAction,
          description: resultPermissions.appactions.description,
          id: resultPermissions.appactions.id
        }))
      }))
      const appsAssigned = [...new Set(response.map(a => a.nameApp))].map(nameApp => response.find(a => a.nameApp === nameApp));
      res.status(201).json({ appsAssigned });
      //console.log(result);
    }).catch(err => {
      // Manejo de errores
      console.error('Error:', err);
    });
  }

  static async getAllPermissions(req, res){
    AppActions.findAll({
      include: [{
        model: apps,
        as: "apps",
      }]
    //includeIgnoreAttributes: false,
    }).then(result => {
      const resultOrg = result
      // Resultado contiene los nombres filtrados
      res.status(201).json({ result });
      //console.log(result);
    }).catch(err => {
      // Manejo de errores
      console.error('Error:', err);
    });
  }

  static async deletePermissions(req, res){
    const { actionid, userid } = req.body;
    PermissionsUser.destroy({
      where: {
        actionid: actionid,
        userid: userid
      }
    }).then(result => {
      res.status(201).json({ message: "Permission deleted successfully" });
    }).catch(err => {
      // Manejo de errores
      console.error('Error:', err);
    });
    userid
  }

  static async addPermissions(req, res){
    //Add permission if not exist
    const { actionid, userid } = req.body;
    PermissionsUser.findOrCreate({
      where: {
        userid: userid,
        actionid: actionid
      }
    }).then(([permission, created]) => {
      if (created) {
        res.status(201).json({ message: "Permission assigned successfully" });
      } else {
        res.status(200).json({ message: "Permission already exists" });
      }
    }).catch(err => {
      console.error('Error:', err);
    });
  }
}
module.exports = UserController;
