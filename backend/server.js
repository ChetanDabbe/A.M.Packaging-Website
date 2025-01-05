const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 },
  fileFilter: (req, file, cb) => {
    file.mimetype.startsWith("image/")
      ? cb(null, true)
      : cb(new Error("Invalid file type"));
  },
});

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: String, required: true },
  features: [{ type: String }],
  image: { type: String },
});

const Product = mongoose.model("Product", ProductSchema);

app.post(
  "/add",
  (req, res, next) => {
    upload.single("productImage")(req, res, (err) => {
      if (err instanceof multer.MulterError || err)
        return res.status(400).json({ error: err.message });
      next();
    });
  },
  async (req, res) => {
    try {
      const { productName, price, capacity, features } = req.body;
      if (!productName || !price || !capacity || !features)
        return res.status(400).json({ error: "Missing fields" });
      if (isNaN(price))
        return res.status(400).json({ error: "Price must be a number" });
      const parsedFeatures = JSON.parse(features);
      if (!Array.isArray(parsedFeatures))
        return res.status(400).json({ error: "Features must be an array" });
      const imgPath = req.file ? req.file.path : null;
      const product = new Product({
        productName,
        price,
        capacity,
        features: parsedFeatures,
        image: imgPath,
      });
      await product.save();
      res.status(201).json({ message: "Product added" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

app.get("/products", async(req,res)=>{
  try{
    const products= await Product.find();
    res.status(200).json(products);

  }
  catch(err){
    res.status(500).json({error:err.message});
  }
})



app.listen(port, () => console.log(`Server running on port ${port}`));
