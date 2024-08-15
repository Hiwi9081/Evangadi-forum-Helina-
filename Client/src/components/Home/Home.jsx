import { useEffect, useReducer, useState, useContext } from "react";
import axios from "../Axiosconfig";
import styles from "./Home.module.css";
// import avatarImg from "../../assets/avatar.jpg";
import {
  FileQuestion,
  Search,
  ArrowUpRight,
  ChevronRight,
  EllipsisVertical,
  PartyPopper,
  X,
} from "lucide-react";
import { Comment } from "react-loader-spinner";
import { AppState } from "../App";
import { Link } from "react-router-dom";
// import NavBar from "../pages/landing/Header";

const Home = () => {
  const token = localStorage.getItem("token");
  const [questions, setquestions] = useState([]);
  const { user } = useContext(AppState);
  console.log(user);

  async function allQuestion() {
    try {
      const { data } = await axios.get("/questions", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const sortedQuestions = data.questions.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setquestions(sortedQuestions);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error fetching questions:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error making request:", error.request);
      } else {
        // Something else happened in making the request that triggered an error
        console.error("Error:", error.message);
      }
    }
  }
  useEffect(() => {
    allQuestion();
  }, []);
  console.log(questions);

  return (
    <section className={styles.home_container}>
      <div className={styles.ask_question_container}>
        <div className={styles.ask_question_text}>
          <Link to={"#"}>
            {" "}
            <button>Ask question</button>
          </Link>
        </div>
        <div className={styles.welcome_text}>
          Welcome: <span> {user?.username}</span>
        </div>
      </div>
      <div className={styles.search_bar_container}>
        <div className={styles.search_bar_wrapper}>
          <Search className={styles.search_icon} />
          <input
            type="text"
            placeholder="Search for questions"
            className={styles.search_bar}
          />
          <X className={styles.remove_icon} />
        </div>
      </div>

      <div>
        <div className={styles.separator} />
      </div>
      <div>
        {questions?.map((question) => (
          <div>
            <div key={question.title} className={styles.question_card}>
              <div className={styles.question_user_info}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                  alt="Avatar"
                  className={styles.avatar}
                />
                <div className={styles.username}>{question.user_name}</div>
              </div>
              <div className={styles.question_title_div}>
                <div className={styles.question_title}>{question.title}</div>
                <div className={styles.chevron_icon}>
                  <ChevronRight />
                </div>
              </div>
            </div>
            <div className={styles.separator} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
