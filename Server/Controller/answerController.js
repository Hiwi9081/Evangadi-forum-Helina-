const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

const getAnswersForQuestion = async (req, res) => {
  const { question_id } = req.params;

  try {
    // Query to fetch answers for the given question_id
    const [answers] = await dbConnection.query(
      "SELECT answer_id, user_name, created_at FROM answers WHERE question_id = ?",
      [question_id]
    );

    if (answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found."
      });
    }

    return res.status(StatusCodes.OK).json({ answers });
  } catch (error) {
    console.error('Error in getAnswersForQuestion:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred."
    });
  }
};

module.exports = { getAnswersForQuestion };