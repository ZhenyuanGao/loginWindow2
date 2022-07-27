const mongoose = require("mongoose");
const userSchema = require("./schema");

const User = mongoose.model("User", userSchema.userInfo);
const Product = mongoose.model("Product", userSchema.product);
module.exports.userInfo = User;
module.exports.product = Product;
