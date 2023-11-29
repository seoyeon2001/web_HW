var express = require("express");
var path = require("path");
const mysql = require("mysql");
// const static = require("serve-static");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tokenRouter = require("./routes/token");
const loginRouter = require("./routes/login");
const joinRouter = require("./routes/join");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/token", tokenRouter);
app.use("/login", loginRouter);
app.use("/join", joinRouter);

app.use((req, res) => {
  res.status(404).render("404");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // TODO 배포 전 여기 수정 밑에거 주석 없애고 그 아래 코드 지우기
  // res.send("something wrong!");
  res.send(`<h1>Error</h1><p>${err.message}</p><pre>${err.stack}</pre>`);
});

module.exports = app;
