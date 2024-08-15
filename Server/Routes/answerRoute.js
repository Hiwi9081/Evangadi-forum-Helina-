const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const { getAnswersForQuestion } = require('../Controller/answerController');

// Route to get answers for a specific question
router.get('/:question_id', authMiddleware, getAnswersForQuestion);

module.exports = router;