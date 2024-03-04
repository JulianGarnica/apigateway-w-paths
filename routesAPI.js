const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');


const apisDir = path.join(__dirname, 'apis');

fs.readdirSync(apisDir).forEach(folder => {
  const folderPath = path.join(apisDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
      const indexPath = path.join(folderPath, 'index.js');
      if (fs.existsSync(indexPath)) {
          const routerTemp = require(indexPath);
          router.use(`/${folder}`, routerTemp);
      }
  }
});


module.exports = router;