const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

// Middleware para todas las rutas nuevas, excepto "/api/"
router.use(`/`, express.static(path.join(__dirname, "hub")));
// router.use((req, res, next) => {
//   if (req.path.startsWith("/api/") || req.path.includes("/css/") || req.path.includes("/js/")) {
//     return next(); // Pasar al siguiente middleware si la ruta comienza con "/api/"
//   }

//   // Renderiza el archivo HTML utilizando EJS y envía el resultado como respuesta
//   ejs.renderFile(path.join(__dirname, "hub", "index.html"), {}, (err, str) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error interno del servidor');
//     }

//     res.send(str);
//   });
// });

//router.use(`/`, express.static(path.join(__dirname, "hub")));

const apisDir = path.join(__dirname, "frontends");
fs.readdirSync(apisDir).forEach((folder) => {
  const folderPath = path.join(apisDir, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    router.use(`/${folder}`, express.static(folderPath));
    router.get(`/${folder}/*`, (req, res, next) => {
      //res.sendFile(folderPath);
      ejs.renderFile(path.join(folderPath, "templ.html"), {}, (err, str2) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error interno del servidor");
        }

        //console.log(str2)
        //res.send(str);
        if (req.path.startsWith("/api/") || req.path.includes("/css/") || req.path.includes("/js/")) {
          return next(); // Pasar al siguiente middleware si la ruta comienza con "/api/"
        }

        res.render(path.join(__dirname, "hub", "index.ejs"), {
          content: str2,
        });
      });
    });
  }
});

module.exports = router;
