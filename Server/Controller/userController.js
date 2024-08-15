const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// DB Connection
const dbPoolConnection = require("../db/dbConfig");

// Register function to handle user registration
const register =async  (req, res)=> {
  const { username, first_name, last_name, email, password } = req.body; // Extract user details from request body

  // Check if all required fields are provided
  if (!email || !password || !username || !first_name || !last_name) {
    return res
      .status(400)
      .json({ message: "Please Provide all required Fields!" });
  }

  try {
    // Check if user with the same username or email already exists
    const [user] = await dbPoolConnection.query(
      "select username, user_id from users where username=? or email=?",
      [username, email]
    );

    // If user exists, return an error
    if (user.length > 0) {
      return res.status(400).json({ message: "This User is Already Exist" });
    }

    // Check if the password length is at least 8 characters
    if (password.length < 8) {
      return res
        .status(400)
        .json({ Message: "Password Must be Atleast 8 Characters" });
    }

    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    await dbPoolConnection.query(
      "INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, first_name, last_name, email, hashedPassword]
    );

    // Return a success message
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err.message); // Log the error message

    // Return an error response if something goes wrong
    return res
      .status(500)
      .json({ message: "Something went wrong, try again Later" });
  }
}

// Login function to handle user login
const  login= async (req, res)=> {
 
  // write your login code here
}

// Function to check if users are registered (for testing purposes)

const checkUsers = async (req, res) => {
   const username = req.user.username;
  const user_id=req.user.user_id;
  return res.status(200).json({ message: "success", username, user_id });
};

module.exports = { register, login, checkUsers }; // Export the functions
