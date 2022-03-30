var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const users = [{ email: "keddd@gmail.com", password: "1234" }];

app.get("/allToget", (req, res) => {
  res.json(users);
});

app.post("/addUser", (req, res) => {
  if (
    req.body !== undefined &&
    req.body.email !== undefined &&
    req.body.password !== undefined
  ) {
    users = [...users, req.body];
    res.json({ message: "succeed", status: "200" });
    return;
  }
  res.json({ message: "failure", status: "500" });
});
/*
app.post("/modUser", (req, res) => {
  if (req.body && req.body.index >= 0 && req.body.index < users.length) {
    const index = req.body.index
    
  }
});
*/
app.post("/findUser", (req, res) => {
  if (
    req.body !== undefined &&
    req.body.email !== undefined &&
    req.body.password !== undefined
  ) {
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === req.body.email &&
        users[i].password === req.body.password
      ) {
        // users.splice(i,1)
        //users = [...users.slice(0, i), ...users.slice(i + 1)];
        break;
      }
    }
    res.json({ message: "succeed", status: "200" });
    return;
  }
  res.json({ message: "failure", status: "500" });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
