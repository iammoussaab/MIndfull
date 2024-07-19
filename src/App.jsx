import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Context } from "./main";
import Login from "./Pages/Login";
import SurveyForm from "./components/SurveyForm";
import GoalForm from "./components/GoalForm";
import Chatbot from "./components/Chatbot";
import PatientDashboard from "./components/dashboard/PatientDashboard";
import ChatPage from "./Pages/Chat/ChatPage";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/user/patient/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        {!isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/survey" element={<SurveyForm />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/goals" element={<GoalForm />} />
          <Route path="/chate" element={<ChatPage />} />
          {isAuthenticated ? (
            <>
              <Route path="/patientdashboard" element={<PatientDashboard />} />
            </>
          ) : null}
        </Routes>
        {!isAuthenticated && <Footer />}
        <ToastContainer position="top-center" />
        <Chatbot />
      </Router>
    </>
  );
};

export default App;
