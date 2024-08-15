const express = require("express");
const app = express();
const port = 5500;

require('dotenv').config();
const userRoute = require('./Routes/userRoute')
const answerRoute = require('./Routes/answerRoute')
const { getConnection, createTables } = require("./db/dbConfig"); 

// JSON middleware
app.use(express.json());

// Database connection config
const dbConnection = getConnection();

// Users Route
const userRoute = require("./Routes/userRoute"); // Adjust the path to your user routes
app.use("/api/users", userRoute);
//questions route middleware
app.use("/api/questions", questionRoutes);
//answerRoute
app.use('/api/answers', answerRoute )



// Questions Route middleware
const questionRoutes = require("./routes/question"); // Adjust the path to your question routes
app.use("/api/questions", questionRoutes);

async function start() {
  try {
    // Test database connection
    await dbConnection.execute("SELECT 1");

    // Create tables if they don't exist
    await createTables();

    // Start the server
    app.listen(port, () => {
      console.log("Database Connection Established!");
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

start();
