const express = require("express");
const logger = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", require("./routesAPI"));

app.use("/", require("./routesFront"))
// app.get("*", (req, res) =>
//   res.status(200).send({
//     message: "Welcome to the beginning of nothingness.",
//   })
// );

const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
