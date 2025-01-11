const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
// const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require('fs');
const app = express();
app.use(cookieParser());
// app.use(helmet());

dotenv.config();

const port = process.env.PORT || 5000;



app.use(
  cors({
    origin: process.env.FRONTEND_URI || "http://localhost:3000", // Default to localhost for development
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use(
//   cors({
//     // origin: "http://localhost:3000", // Replace with your frontend URL
//     origin:process.env.REACT_APP_FRONTEND_URI,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.error("DB connection error:", err));

// app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, default: "" },
  role: { type: String, default: "user" },
});

const User = mongoose.model("User", UserSchema);

const AdminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companyName: { type: String, default: "" },
  role: { type: String, default: "admin" },
});

const Admin = mongoose.model("Admin", AdminSchema);

app.post("/register", async (req, res) => {
  const { firstName, lastName, companyName, email, mobile, password } =
    req.body;

  if (!firstName || !lastName || !email || !mobile || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      companyName,
      email,
      mobile,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create account" });
  }
});

// app.post("/register", async (req, res) => {
//   const { firstName, lastName, email, mobile, password, companyName } = req.body;

//   if (!firstName || !lastName || !email || !mobile || !password ) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) {
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newAdmin = new Admin({
//       firstName,
//       lastName,
//       email,
//       mobile,
//       password: hashedPassword,
//       companyName: companyName || "",
//       role: "admin",
//     });

//     await newAdmin.save();
//     res.status(201).json({ message: "Admin account created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create admin account" });
//   }
// });

app.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ error: "Email, password, and role are required" });
  }

  try {
    let user;

    if (role === "admin") {
      user = await Admin.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Admin not found" });
      }
    } else {
      user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "default_secret",
      {
        expiresIn: "60d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
    });

    res.status(200).json({
      message: "Login successful",
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// const authenticateAdmin = async (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized, please login" });
//   }
//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET || "default_secret"
//     );
//     const user = await User.findById(decoded.userId);
//     if (!user || user.role !== "admin") {
//       return res.status(403).json({ error: "Only admin can add products" });
//     }
//     req.user = user; // Attach user data to the request
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       error:
//         err.name === "TokenExpiredError"
//           ? "Token has expired, please login again"
//           : "Unauthorized",
//     });
//   }
// };
const authenticateAdmin = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized, please login" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    const admin = await Admin.findById(decoded.userId);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ error: "Only admin can add products" });
    }

    req.user = admin;
    console.log("Authenticated admin:", admin); 

    next();
  } catch (err) {
    return res.status(401).json({
      error:
        err.name === "TokenExpiredError"
          ? "Token has expired, please login again"
          : "Unauthorized",
    });
  }
};

app.delete("/delete/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.image) {
      const imagePath = path.join(__dirname, product.image);
       
      
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
       
      }
    }

    await Product.findByIdAndDelete(id); 
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// app.put("/update/:id", authenticateAdmin, async (req, res) => {
//   const { id } = req.params;
//   const { productName, price, capacity, features, image } = req.body;

//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     console.log("Request body:", req.body); // Debug: log incoming data

//     const updateFields = { 
//       productName, 
//       price, 
//       capacity, 
//       features 
//     };

//     if (image) {
//       const oldImagePath = path.join(__dirname, product.image);
//       if (product.image && fs.existsSync(oldImagePath)) {
//         fs.unlinkSync(oldImagePath); // Delete old image
//       }
//       updateFields.image = image; // Update image path
//     }

//     console.log("Updating product with ID:", id, "Fields:", updateFields); // Debug log

//     const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
//       new: true,
//     });

//     if (!updatedProduct) {
//       return res.status(404).json({ error: "Product not found after update" });
//     }

//     res.status(200).json({ message: "Product updated successfully", updatedProduct });
//   } catch (err) {
//     console.error("Error updating product:", err.message); // Log error
//     res.status(500).json({ error: "Failed to update product" });
//   }
// });


//Updating the product details
app.put("/update/:id", authenticateAdmin, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { productName, price, capacity, features } = req.body;

  console.log("Request ID:", id);
  console.log("Request body:", req.body);
  console.log("Uploaded file:", req.file); 

  try {
    
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    
    console.log("Old image path:", product.image);

    
    const updateFields = {};

  
    if (productName !== undefined) updateFields.productName = productName;
    if (price !== undefined) updateFields.price = price;
    if (capacity !== undefined) updateFields.capacity = capacity;
    if (features !== undefined) updateFields.features = features;

  
    if (req.file) {
      const oldImagePath = path.join(__dirname, product.image);
      if (product.image && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      updateFields.image = req.file.path;
      console.log("New image path:", req.file.path); 
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    console.log("Updating product with ID:", id, "Fields:", updateFields);

    const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found after update" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    console.error("Error updating product:", err.message); // Log error
    res.status(500).json({ error: "Failed to update product", details: err.message });
  }
});


//Updating the admin password


app.put('/updateAdminPassword', authenticateAdmin, async (req, res) => {
  const admin = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Please provide both current and new passwords' });
  }

  try {
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong, please try again' });
  }
});






//Add the product which is only accessible by admin
app.post(
  "/add",
  authenticateAdmin,
  upload.single("productImage"),
  async (req, res) => {
    try {
      const { productName, price, capacity, features } = req.body;

      if (!productName || !price || !capacity || !features) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (isNaN(price) || price <= 0) {
        return res
          .status(400)
          .json({ error: "Price must be a positive number" });
      }

      let parsedFeatures;
      try {
        parsedFeatures = JSON.parse(features);
        if (!Array.isArray(parsedFeatures)) {
          throw new Error();
        }
      } catch {
        return res
          .status(400)
          .json({ error: "Features must be a valid JSON array" });
      }

      const imgPath = req.file ? req.file.path.replace(/\\/g, "/") : null; // Convert backslashes to forward slashes
      const product = new Product({
        productName,
        price,
        capacity,
        features: parsedFeatures,
        image: imgPath,
      });
      await product.save();

      await product.save();
      res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
      console.log("Product Upload Error:", err.message);
      res.status(500).json({ error: "Failed to add product" });
    }
  }
);


//Retriving the product to display
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Retriving the user data to display in user section of admin panel
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({}, "firstName lastName email mobile companyName").lean();
    const formattedUsers = users.map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      mobile: user.mobile,
      companyName: user.companyName,
    }));
    res.status(200).json(formattedUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(port, () => console.log(`Server running on port ${port}`));
