const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const apisDir = path.join(__dirname, "frontends");


fs.readdirSync(apisDir).forEach((folder) => {
  const folderPath = path.join(apisDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    router.use(`/${folder}`, express.static(folderPath));
    router.get(`/${folder}/*`, (req, res) => {
      res.sendFile(folderPath);
    });
  }
});


module.exports = router;
