//schema => define your db....... then move on use it to generate the model
//

const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
  },
  cart: [
    {
      name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
});
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  quantity: {
    type: Number,
    required: true,
    max: 9999,
  },
  price: {
    type: Number,
    required: true,
    max: 9999,
  },
  image: {
    type: String,
    required: true,
    max: 1024,
  },
  description: {
    type: String,
    required: false,
    max: 1024,
  },
});
//module.exports = userSchema;
module.exports.userInfo = userSchema;
module.exports.product = productSchema;
