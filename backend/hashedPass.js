const bcrypt = require('bcrypt');

// Password to hash
const plainPassword = "Website_AM@2025";

// Hash the password
bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed password:", hashedPassword);
  }
});
