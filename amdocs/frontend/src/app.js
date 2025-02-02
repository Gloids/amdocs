// src/App.js
import { useState } from "react";
import axios from "axios";
import "./App.css"; // Optional: for additional styling

function ManabiApp() {
  const [userData, setUserData] = useState({
    academic_background: "",
    certifications: "",
    career_goals: "",
    learning_preferences: ""
  });
  const [recommendations, setRecommendations] = useState([]);
  const [summary, setSummary] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handler for recommendations
  const handleRecommend = async (e) => {
    e.preventDefault();
    try {
      // Note: The backend expects certifications and learning_preferences as arrays.
      const payload = {
        ...userData,
        certifications: userData.certifications.split(",").map(item => item.trim()),
        learning_preferences: userData.learning_preferences.split(",").map(item => item.trim())
      };
      const response = await axios.post("http://127.0.0.1:8000/recommend", payload);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error("Error fetching recommendations", error);
    }
  };

  // Handler for generating a summary via generative AI
  const handleGenerateSummary = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...userData,
        certifications: userData.certifications.split(",").map(item => item.trim()),
        learning_preferences: userData.learning_preferences.split(",").map(item => item.trim())
      };
      const response = await axios.post("http://127.0.0.1:8000/generate_summary", payload);
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error generating summary", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Manabi AI-Powered Learning</h1>
      <form className="bg-white p-6 rounded-lg shadow-md w-96">
        <label className="block mb-2">Academic Background:</label>
        <input
          type="text"
          name="academic_background"
          value={userData.academic_background}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
        />
        
        <label className="block mb-2">Certifications (comma separated):</label>
        <input
          type="text"
          name="certifications"
          value={userData.certifications}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
        />

        <label className="block mb-2">Career Goals:</label>
        <input
          type="text"
          name="career_goals"
          value={userData.career_goals}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
          required
        />

        <label className="block mb-2">Learning Preferences (comma separated):</label>
        <input
          type="text"
          name="learning_preferences"
          value={userData.learning_preferences}
          onChange={handleChange}
          className="w-full p-2 border rounded-md mb-4"
        />

        <div className="flex gap-2">
          <button
            onClick={handleRecommend}
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
          >
            Get Recommendations
          </button>
          <button
            onClick={handleGenerateSummary}
            className="bg-green-500 text-white p-2 rounded-md w-full hover:bg-green-600"
          >
            Generate Summary
          </button>
        </div>
      </form>
      
      {recommendations.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Recommended Courses</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index} className="p-2 border-b last:border-none">
                Course ID: {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Your Personalized Learning Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default ManabiApp;
