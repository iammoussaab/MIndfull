// GoalForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoalForm = () => {
    const [goalData, setGoalData] = useState({
        user: localStorage.getItem("userId") || "",
        goal1: "",
        goal2: "",
        goal3: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigateTo = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(goalData); // Log the goalData to verify it before submission
        try {
            const response = await axios.post(
                "http://localhost:5000/api/v1/goals",
                goalData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            console.log("Goals submitted:", response.data);
            // Optionally, you can redirect the user to another page after submitting goals
            navigateTo("/dashboard");
        } catch (error) {
            console.error("Error submitting goals:", error);
            alert("There was an error submitting the goals. Please try again.");
        }
    };

    return (
        <div className="container form-component login-form">
            <form onSubmit={handleSubmit}>
                <h1>Set Your Goals</h1>
                <div className="form-row">
                    <label>
                        Goal 1:
                        <input
                            type="text"
                            name="goal1"
                            value={goalData.goal1}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Goal 2:
                        <input
                            type="text"
                            name="goal2"
                            value={goalData.goal2}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        Goal 3:
                        <input
                            type="text"
                            name="goal3"
                            value={goalData.goal3}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button type="submit">Submit Goals</button>
            </form>
        </div>
    );
};

export default GoalForm;
