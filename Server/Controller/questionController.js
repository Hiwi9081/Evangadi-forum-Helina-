const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");


const { v4: uuidv4 } = require("uuid");

const postQuestion = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: "all fields required" });
  }
  try {
    const question_id = uuidv4();

    await dbConnection.query(
      "insert into questions (question_id,title, description,user_id) values (?, ?,?,?)",
      [question_id, title, description, req.user.id]
    );
    return res.status(200).json({ msg: "Question added successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Some error occurred. Please try again" });
  }
};
async function getSingleQuestion(req, res) {

    const { question_id } = req.params;

    try {
        const [question] = await dbConnection.query( "SELECT * FROM questions WHERE questionid = ?",[question_id]);

        if (question.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: "Not Found",
            message: "The requested question could not be found."
        });
        }

        res.status(StatusCodes.OK).json({ question: question[0] });

    } catch (error) {
        console.error('Error in getSingleQuestion:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Internal Server Error",
        message: error.message
        });
        }
    }

const allQuestions = async (req, res) => {
  //write your code here 

  try {
    const [questions] = await dbConnection.query(
      "SELECT  title,description,question_id,user_name FROM questions JOIN users ON users.username = questions.user_name ORDER BY id DESC "
    );
    return res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.log(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error.",
      message: "An unexpected error occurred.",
    });
  }

};




module.exports = { getSingleQuestion, postQuestion, allQuestions };
