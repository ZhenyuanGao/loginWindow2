var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//data base import
const connectToMongoose = require("./db/connect");
connectToMongoose();

//const User = require("./db/model");
const Comb = require("./db/model");
const User = Comb.userInfo;
const Product = Comb.product;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

let users = [{ email: "keddd@gmail.com", password: "1234567" }];
//let products = [{ pName: "telephone", quantity: 5, price: 100}];
let products = [{ pName: "telephone", quantity: 5, price: 100 }];
/*
app.post("/addStock", (req, res) => {
  if (
    req.body !== undefined &&
    req.body.pName !== undefined &&
    req.body.quantity !== undefined
  ) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].pName === req.body.pName) {
        products[i].quantity += req.body.quantity;
        res.json({ message: "succeed", status: "200" });
        return;
      }
    }

    products = [...products, req.body];
    res.json({ message: "succeed", status: "200" });
    return;
  }
  res.json({ message: "failure", status: "500" });
});
*/
//const user = require("./model/User");

app.get("/allToget", async (req, res) => {
  const userFromDB = await User.find({}).exec();
  const userSendToFrontEn = userFromDB.map((name, email, _id) => {
    return { name, email, id: _id };
  });

  res.json(userFromDB);
});
app.get("/allProduct", async (req, res) => {
  const userFromDB = await Product.find({}).exec();

  res.json(userFromDB);
});

/*
app.get("/allToget", (req, res) => {
  res.json(users);
});
*/
app.get("/allProducts", (req, res) => {
  res.json(products);
});
/*
app.post("/register", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();

    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
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
*/

app.post("/addUser", async (req, res) => {
  if (
    req.body !== undefined &&
    req.body.email !== undefined &&
    req.body.password !== undefined
  ) {
    const password = await bcrypt.hash(req.body.password, 10);

    try {
      const response = await User.create({
        email: req.body.email,
        password: password,
      });
      console.log("user was created successfully:", response);
    } catch (error) {
      console.log(JSON.stringify(error));
      return res.json({ status: "error" });
    }
    /*
    const newUser = await user.save();
    if (user === newUser) {
      res.json({
        message: "succeed",
        status: "200",
        newUser: {
          email: newUser.email,
          password: newUser.password,
          id: newUser._id,
        },
      });
    }

    return;
    */
  }
  // res.json({ message: "failure", status: "500" });
});

const JWT_SECRET = "adsagdagsadsagsgsadsdgsaggfcc41432432)((*&^%dseaqt2dssa";
app.post("/logInUser", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;
  //console.log("userEmail is" + email);

  const user = await User.findOne({ email: email }).lean();
  //console.log("user is" + user);

  //const newuser = await User.findOne({ email: req.body.email });
  //console.log("user is" + newuser);
  //console.log("this is the user password" + user.password);
  //console.log("this is the nwq user password" + newuser.password);

  if (!user) {
    return res.json({ status: "error", error: "Invalid username/password" });
  }
  if (await bcrypt.compare(password, user.password)) {
    console.log("pasword is" + password);
    console.log("user passsword is" + user.password);
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    // req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days

    return res.json({ status: "200", data: token });
  }

  res.json({ error: "Invalid useremail/Password", status: "error" });
});
app.post("/modifyUser", async (req, res) => {
  if (req.body !== undefined && req.body.email !== undefined) {
    console.log(req.body.email);
    //console.log(req.body.shoppingList);
    //const product = await Product.findOneAndUpdate({ name: req.body.name }).lean();

    const user1 = await User.findOne({ email: req.body.email });
    let addNewElement = true;
    for (let i = 0; i < user1.cart.length; i++) {
      console.log(user1.cart[i].name);
      console.log(req.body.name);
      if (user1.cart[i].name === req.body.name) {
        user1.cart[i].quantity += req.body.quantity;
        const updateUser = await user1.save();
        addNewElement = false;
        return res.json({
          data: updateUser.cart,
          message: "succeed",
          status: "200",
        });
      }
    }
    if (addNewElement === true) {
      const user = await User.updateOne(
        { email: req.body.email },

        {
          $push: {
            cart: {
              name: req.body.name,
              quantity: req.body.quantity,
              price: req.body.price,
              image: req.body.image,
            },
          },
        }
      );
      return res.json({
        data: user.cart,
        message: "succeed",
        status: "200",
      });
    }

    /*
    const user = await User.findOne({ email: req.body.email });
    if (user.cart) {
      user.cart = [0, 1];
    }
    console.log(user.password);
    const updateUser = await user.save();
*/
    //   console.log(product);
    /*
    product.name = req.body.name;
    product.quantity = req.body.quantity;
    product.price = req.body.price;
    product.image = req.body.image;
    product.description = req.body.description;
*/
    return res.json({
      message: "failed",
      status: "500",
    });
  }
  res.json({
    message: "failure, can not find this user document in our database.",
    status: "500",
  });
});

app.post("/deleteCart", async (req, res) => {
  if (req.body !== undefined && req.body.email !== undefined) {
    // console.log(req.body.email);
    //console.log(req.body.shoppingList);
    //const product = await Product.findOneAndUpdate({ name: req.body.name }).lean();

    const user1 = await User.findOne({ email: req.body.email });
    user1.cart.splice(req.body.index, 1);
    const newUser = await user1.save();

    return res.json({
      data: newUser.cart,
      message: "success",
      status: "200",
    });
  }
  res.json({
    message: "failure, can not find this user document in our database.",
    status: "500",
  });
});
app.post("/modifyCartQ", async (req, res) => {
  if (
    req.body !== undefined &&
    req.body.email !== undefined &&
    req.body.index !== undefined &&
    req.body.valueQ != undefined
  ) {
    // console.log(req.body.email);
    //console.log(req.body.shoppingList);
    //const product = await Product.findOneAndUpdate({ name: req.body.name }).lean();

    const user1 = await User.findOne({ email: req.body.email });
    //user1.cart.splice(req.body.index, 1);
    user1.cart[req.body.index].quantity = req.body.valueQ;

    const newUser = await user1.save();

    return res.json({
      data: newUser.cart,
      message: "success",
      status: "200",
    });
  }
  res.json({
    message: "failure, can not find this user document in our database.",
    status: "500",
  });
});
app.post("/getCart", async (req, res) => {
  if (req.body !== undefined && req.body.email !== undefined) {
    // console.log(req.body.email);
    //console.log(req.body.shoppingList);
    //const product = await Product.findOneAndUpdate({ name: req.body.name }).lean();

    const user1 = await User.findOne({ email: req.body.email });

    return res.json(user1.cart);
  }
  return res.json({
    data: "the procedure failed",
    message: "failure, can not find this user document in our database.",
    status: "500",
  });
});
app.post("/modifyStock", async (req, res) => {
  if (
    req.body !== undefined &&
    req.body.name !== undefined &&
    req.body.quantity !== undefined &&
    req.body.price !== undefined &&
    req.body.image !== undefined &&
    req.body.description != undefined
  ) {
    //const product = await Product.findOneAndUpdate({ name: req.body.name }).lean();
    const product = await Product.updateOne(
      { name: req.body.name },
      {
        $set: {
          quantity: req.body.quantity,
          price: req.body.price,
          image: req.body.image,
          description: req.body.description,
        },
      }
    );
    //   console.log(product);
    /*
    product.name = req.body.name;
    product.quantity = req.body.quantity;
    product.price = req.body.price;
    product.image = req.body.image;
    product.description = req.body.description;
*/
    return res.json({
      message: "succeed",
      status: "200",
    });
  }
  res.json({
    message: "failure, can not find this user document in our database.",
    status: "500",
  });
});

app.post("/addStock", async (req, res) => {
  if (
    req.body !== undefined &&
    req.body.name !== undefined &&
    req.body.quantity !== undefined &&
    req.body.price !== undefined &&
    req.body.image !== undefined &&
    req.body.description != undefined
  ) {
    const product = new Product({
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
    });

    const newProduct = await product.save();
    if (product === newProduct) {
      res.json({
        message: "succeed",
        status: "200",
        newProduct: {
          name: newProduct.name,
          quantity: newProduct.quantity,
          price: newProduct.price,
          image: newProduct.image,
          description: newProduct.description,
          id: newProduct._id,
        },
      });
    }

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
      if (users[i].email === req.body.email) {
        //users.splice(i, 1);
        //users = [...users.slice(0, i), ...users.slice(i + 1)];
        res.json({ message: "succeed", status: "200" });
        return;
      }
    }
  }
  res.json({ message: "failure", status: "500" });
});
app.post("/modUser1", async (req, res) => {
  if (req.body && req.body.id) {
    const id = req.body.id;
    const queryResult = await User.findOne({ _id: id });
    queryResult.email = "kegao@westmont.edu";
    res.json({
      message: "succeed",
      status: "200",
      chanedUser: {
        email: queryResult.email,
        password: queryResult.password,
        // id: queryResult._id,
      },
    });
    //console.log(queryResult);
    //const tempStatus = queryResult.email;
  }
  res.json({ message: "failure", status: "500" });
});

app.post("/delUser", async (req, res) => {
  if (req.body && req.body.id) {
    const id = req.body.id;
    const queryResult = await User.deleteOne({ _id: id });
    if (queryResult) {
      res.json({ message: "success", status: "200" });
    } else {
      res.json({ message: "failure", status: "500" });
    }
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
