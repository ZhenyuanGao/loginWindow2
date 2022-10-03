const mongoose = require("mongoose");
const connectionStr =
  "mongodb+srv://kegao:1234@cluster0.wovks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectToMongoose = () => {
  mongoose.connect(connectionStr);
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connect error:"));
db.once("open", () => {
  console.log("connected");
});

module.exports = connectToMongoose;
