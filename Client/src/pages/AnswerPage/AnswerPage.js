import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import axios from "../axiosConfig";
import "./AnswerPage.css";

function AnswerPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const answerRef = useRef();

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        // Fetch question details
        const questionResponse = await axios.get(`/api/questions/${id}`);
        setQuestion(questionResponse.data.question);

        // Fetch answers for the question
        const answersResponse = await axios.get(`/api/answers/${id}`);
        setAnswers(answersResponse.data.answers);
      } catch (err) {
        setError("Error fetching data");
        console.error("Error fetching question and answers: ", err);
      }
    };

    fetchQuestionAndAnswers();
  }, [id]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    const answer = answerRef.current.value;

    if (!answer) {
      alert("Please provide an answer");
      return;
    }

    try {
      const response = await axios.post(`/api/answers`, {
        question_id: id,
        answer: answer,
      });

      setAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          id: response.data.id,
          user_name: "You",
          answer: answer,
        },
      ]);

      alert("Answer submitted successfully");
      answerRef.current.value = "";
    } catch (error) {
      console.error("Error submitting answer: ", error);
      alert("Something went wrong while submitting the answer");
    }
  };

  return (
    <div className="answer-page">
      {error && <div className="error">{error}</div>}
      {!error && (
        <>
          <div className="question-section">
            <h1>QUESTION</h1>
            <div className="question-title">
              <FaArrowCircleRight className="arrow-icon" />
              <h2>
                <span>{question.title}</span>
              </h2>
            </div>
            <p>{question.description}</p>
          </div>
          <div className="answers-section">
            <h4 className="community-answers">Answer From The Community</h4>
            {answers.length > 0 ? (
              answers.map((answer) => (
                <div key={answer.id} className="answer-box">
                  <RiAccountCircleFill className="user-icon" />
                  <div className="answer-content">
                    <div className="answer-header">
                      <p className="answer-username">
                        <strong>{answer.user_name}</strong>
                      </p>
                      <p className="answer-text">{answer.answer}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No answers yet.</p>
            )}
          </div>
          <div className="answer-form-section">
            <form onSubmit={handleAnswerSubmit}>
              <textarea
                ref={answerRef}
                placeholder="Your answer ..."
                rows="4"
                required
              ></textarea>
              <button type="submit">Post Answer</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default AnswerPage;
