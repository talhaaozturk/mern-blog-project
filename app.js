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
const bodyParser = require("body-parser");
const app = express();
const moment = require("moment");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo");

// const generateDate = require("./helpers/generateDate").generateDate;
mongoose.connect("mongodb://127.0.0.1/nodeblog_db");
app.use(
  expressSession({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1/nodeblog_db" }),
  })
);

//Flash message Middleware
app.use((req, res, next) => {
  res.locals.sessionFlashSuccess = req.session.sessionFlashSuccess;
  delete req.session.sessionFlashSuccess;
  next();
});
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//LINKLERIN DUZENLENMESI MIDDLEWARE(giriş yapan kullanıcıya tekrar login register linklerinin gösterilmemesi)
app.use((req, res, next) => {
  const { userId } = req.session;

  if (userId) {
    res.locals = {
      displayLink: true,
    };
  } else {
    res.locals = {
      displayLink: false,
    };
  }
  next();
});

const main = require("./routes/main");
app.use("/", main);
const posts = require("./routes/posts");
app.use("/posts", posts);

const users = require("./routes/users");
const session = require("express-session");
app.use("/users", users);

const hbs = exphbs.create({
  helpers: {
    generateDate: (date, format) => {
      return moment(date).format(format);
    },
  },
});

app.engine("handlebars", hbs.engine);
// app.engine(
//   "handlebars",
//   exphbs.engine({ helpers: { generateDate: generateDate } })
// );
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.listen(port, hostname, () => {
  console.log(`Server çalışıyor, http://${hostname}:${port}/`);
});
