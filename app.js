// const http = require("http");
// const hostname = "127.0.0.1";
// const port = 3000;
// const fs = require("fs");
// const indexPage = fs.readFileSync("home.html");
// const aboutPage = fs.readFileSync("about.html");
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     return res.end(indexPage);
//   } else if (req.url === "/about") {
//     return res.end(aboutPage);
//   } else {
//     res.statusCode = 404;
//     res.end("SAYFA BULUNAMADI");
//   }
// });

// server.listen(port, hostname, () => {
//   console.log(`Server çalışıyor, http://${hostname}:${port}`);
// });
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const path = require("path");
const express = require("express");
const port = 3000;
const hostname = "127.0.0.1";

const app = express();
const main = require("./routes/main");
app.use("/", main);
// await mongoose.connect("mongodb://127.0.0.1/nodeblog_db");

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.listen(port, hostname, () => {
  console.log(`Server çalışıyor, http://${hostname}:${port}/`);
});
