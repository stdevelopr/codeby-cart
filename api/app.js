const express = require("express");

const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(bodyParser.json());

//Import routes
const productsRoute = require("./routes/products");
app.use("/products", productsRoute);

//Connect to DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected DB"), err => console.log(err));

mongoose.set("useCreateIndex", true);

// Populate the DB
const Product = require("./models/Product");
const products = require("./initialProducts");
let db = mongoose.connection;
db.once("open", () => {
  Product.insertMany(products, { ordered: false })
    .then(function() {
      console.log("Data inserted"); // Success
    })
    .catch(function(error) {
      console.log("Docs already inserted"); // Failure
    });
});

app.listen(9000);
