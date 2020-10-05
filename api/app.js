const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 5000;

require("dotenv/config");

app.use(bodyParser.json());

//Import routes
const productsRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
app.use("/products", productsRoute);
app.use("/cart", cartRoute);

//Connect to DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    autoIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected DB"), err => console.log(err));

// Populate the DB
const Product = require("./models/Product");
const products = require("./initialProducts");
let db = mongoose.connection;

Product.on("index", () => {
  Product.insertMany(products, { ordered: false })
    .then(function() {
      console.log("Data inserted"); // Success
    })
    .catch(function(error) {
      console.log("Docs already inserted"); // Failure
    });
});

app.listen(port);
