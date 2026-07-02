const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const Product = require("./models/Product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const importProducts = async () => {
  try {
    const data = JSON.parse(
      fs.readFileSync("./products.json", "utf8")
    );

    await Product.deleteMany();

    await Product.insertMany(data);

    console.log("✅ Products Imported Successfully");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

importProducts();