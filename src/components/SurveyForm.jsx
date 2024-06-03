import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./survey.css";

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    user: localStorage.getItem("userId") || "",
    anxietyFrequency: "",
    overallMentalHealth: 5,
    diagnosed: "",
    overwhelmedFrequency: "",
    accessToServices: "",
    relaxationActivitiesFrequency: "",
    suicidalThoughts: "",
    sleepQuality: "",
    support: "",
    substanceUseFrequency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Log the formData to verify it before submission
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/survey",
        formData, // Make sure formData is being sent correctly
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Survey submitted:", response.data);
      navigateTo("/goals");

      // alert("Thank you for submitting the survey. Your responses are valuable.");
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("There was an error submitting the survey. Please try again.");
    }
  };

  return (
    <div className="survey-form">
      <form onSubmit={handleSubmit}>
        <h1>Mental Health Survey</h1>
        <div className="form-row survey-form ">
          <label>
            How often do you experience feelings of anxiety or panic attacks?
            <p>This helps us understand how frequently you face anxiety or panic attacks.</p>
            <select
              name="anxietyFrequency"
              value={formData.anxietyFrequency}
              onChange={handleChange}
            >
              <option value="" disabled selected></option>
              <option value="Never">Never</option>
              <option value="Rarely">Rarely</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
              <option value="Always">Always</option>
            </select>
          </label>

          <label>
            On a scale of 1 to 10, how would you rate your overall mental health?
            <p>A higher number indicates that you have better mental health .</p>
            <input
              type="number"
              name="overallMentalHealth"
              min="1"
              max="10"
              value={formData.overallMentalHealth}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-row survey-form">
          <label>
            Have you ever been diagnosed with a mental health disorder by a professional?
            <p>Knowing about any official diagnoses can help us provide better support.</p>
            <select
              name="diagnosed"
              value={formData.diagnosed}
              onChange={handleChange}
            >
              <option value="" disabled selected></option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          <label>
            How frequently do you feel overwhelmed by daily tasks in your day?
            <p>This question helps us understand your daily stress levels.</p>
            <select
              name="overwhelmedFrequency"
              value={formData.overwhelmedFrequency}
              onChange={handleChange}
            >
              <option value="" disabled selected></option>
              <option value="Never">Never</option>
              <option value="Rarely">Rarely</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
              <option value="Always">Always</option>
            </select>
          </label>
        </div>
        <div className="form-row survey-form">
          <label>
            Do you have access to mental health services such as counseling or therapy?
            <p>Access to professional help is crucial for managing mental health effectively.</p>
            <select
              name="accessToServices"
              value={formData.accessToServices}
              onChange={handleChange}
            >
              <option value="" disabled selected></option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          <label>
            How often do you engage in activities that you enjoy and find relaxing?
            <p>Engaging in enjoyable activities can significantly impact your mental well-being.</p>
            <select
              name="relaxationActivitiesFrequency"
              value={formData.relaxationActivitiesFrequency}
              onChange={handleChange}
            >
              <option value="" disabled selected></option>
              <option value="Daily">Daily</option>
              <option value="Several times a week">Several times a week</option>
              <option value="Once a week">Once a week</option>
              <option value="A few times a month">A few times a month</option>
              <option value="Rarely">Rarely</option>
              <option value="Never">Never</option>
            </select>
          </label>
        </div>
        <div className="form-row survey-form">
          <label>
            Have you ever had suicidal thoughts?
            <p>Your safety is our priority. Please reach out to a professional if you need help.</p>
            <select
              name="suicidalThoughts"
              value={formData.suicidalThoughts}
              onChange={handleChange}
            >
              <option value="" disabled selected></option>
              <option value="Yes, currently">Yes, currently</option>
              <option value="Yes, in the past">Yes, in the past</option>
              <option value="No">No</option>
            </select>
          </label>

          <label>
            How well do you sleep on average?
            <p>Good sleep is vital for mental health. This helps us understand your sleep patterns.</p>
            <select
              name="sleepQuality"
              value={formData.sleepQuality}
              onChange={handleChange}
            >
              <option value="" disabled selected></option>
              <option value="Very well">Very well</option>
              <option value="Well">Well</option>
              <option value="Okay">Okay</option>
              <option value="Poorly">Poorly</option>
              <option value="Very poorly">Very poorly</option>
            </select>
          </label>
        </div>
        <div className="form-row survey-form">
          <label>
            Do you feel supported by friends or family in your mental health journey?
            <p>Support from loved ones can make a significant difference in mental health recovery.</p>
            <select
              name="support"
              value={formData.support}
              onChange={handleChange}
            >
              <option value="" disabled selected></option>
              <option value="Yes, very supported">Yes, very supported</option>
              <option value="Yes, somewhat supported">Yes, somewhat supported</option>
              <option value="No, not supported">No, not supported</option>
              <option value="I do not have friends or family to support me">I do not have friends or family to support me</option>
            </select>
          </label>

          <label>
            How often do you use substances (e.g., alcohol, drugs) to cope with stress or emotions?
            <p>Understanding substance use can help us provide better guidance and support.</p>
            <select
              name="substanceUseFrequency"
              value={formData.substanceUseFrequency}
              onChange={handleChange}
            >
              <option value="" disabled selected></option>
              <option value="Never">Never</option>
              <option value="Rarely">Rarely</option>
              <option value="Sometimes">Sometimes</option>
              <option value="Often">Often</option>
              <option value="Always">Always</option>
            </select>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SurveyForm;
