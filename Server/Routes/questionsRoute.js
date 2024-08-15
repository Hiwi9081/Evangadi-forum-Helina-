const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddlewareit");
const { getSingleQuestion } = require("../controller/questonController");


router.get('/:question_id', authMiddleware, getSingleQuestion, getAllQusetions);
// post question route
router.post("/", postQuestion);

//router.get("/", getAllQusetions);


//router.get("/:question_id", authMiddleware, getSingleQuestion);
// post question route
router.post("/post", authMiddleware, postQuestion);


module.exports = router;
