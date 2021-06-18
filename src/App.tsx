import { useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Quiz } from "./components/Quiz/Quiz";
import { Home } from "./components/Home/Home";
import { Nav } from "./components/Nav/Nav";
import { QuizListing } from "./components/Quiz-Listing/Quiz-Listing";
import { useQuiz } from "./contexts/Quiz-Context";
import { Login } from "./auth/Login/Login";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const { state, dispatch } = useQuiz();
  const { isAuthenticated, user } = useAuth0();
  console.log(user);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/quiz/:id"
          element={isAuthenticated ? <Quiz /> : <Login />}
        />
        <Route path="/quiz" element={<QuizListing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
