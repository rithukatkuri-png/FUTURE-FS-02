const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const email = "rithu@gmail.com";
  const password = "098765";
  const username = "Rithu";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("User already exists:", email);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashedPassword });

  console.log("Admin user created!");
  console.log("Email:", email);
  console.log("Password:", password);
  process.exit(0);
}

createAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
