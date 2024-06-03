// NewGoalForm.js
import React, { useState } from 'react';
import axios from 'axios';

const NewGoalForm = () => {
  const [shortTermGoals, setShortTermGoals] = useState('');
  const [longTermGoals, setLongTermGoals] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const userId = localStorage.getItem('userId') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/goals', {
        userId,
        shortTermGoals: shortTermGoals.split(','),
        longTermGoals: longTermGoals.split(','),
        additionalInfo
      });
      alert('Goals created successfully');
      // Clear form fields after successful submission
      setShortTermGoals('');
      setLongTermGoals('');
      setAdditionalInfo('');
    } catch (error) {
      console.error('Error creating goals:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Goals</h2>
      <input type="hidden" name="userId" value={userId} />
      <label>
        Short Term Goals:
        <input
          type="text"
          value={shortTermGoals}
          onChange={(e) => setShortTermGoals(e.target.value)}
        />
      </label>
      <br />
      <label>
        Long Term Goals:
        <input
          type="text"
          value={longTermGoals}
          onChange={(e) => setLongTermGoals(e.target.value)}
        />
      </label>
      <br />
      <label>
        Additional Information:
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Create Goals</button>
    </form>
  );
};

export default NewGoalForm;
