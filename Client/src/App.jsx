import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "../src/components/Auth/SignUp"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<Login />} />
          <Route path="/SignUp" element={<SignUp
          />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}



export default App;

