import React, { useState } from 'react';
import { BookOpen, Target, AlignCenterVertical as Certificate, Settings, ChevronRight } from 'lucide-react';

interface UserData {
  academic_background: string;
  certifications: string;
  career_goals: string;
  learning_preferences: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
}

function App() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    academic_background: '',
    certifications: '',
    career_goals: '',
    learning_preferences: ''
  });

  // Mock recommended courses (in a real app, this would come from the API)
  const recommendedCourses: Course[] = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      description: "Learn the basics of machine learning algorithms and their applications.",
      duration: "8 weeks",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      title: "Data Science with Python",
      description: "Master data analysis and visualization using Python libraries.",
      duration: "10 weeks",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      description: "Complete guide to modern web development technologies.",
      duration: "12 weeks",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Manabi</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 1 ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create Your Learning Profile</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Background
                  </label>
                  <input
                    type="text"
                    name="academic_background"
                    value={userData.academic_background}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certifications (comma separated)
                  </label>
                  <input
                    type="text"
                    name="certifications"
                    value={userData.certifications}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Career Goals
                  </label>
                  <textarea
                    name="career_goals"
                    value={userData.career_goals}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Learning Preferences
                  </label>
                  <input
                    type="text"
                    name="learning_preferences"
                    value={userData.learning_preferences}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Get Personalized Recommendations</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Your Personalized Learning Path</h2>
            
            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-medium text-gray-900">Learning Goals</h3>
                </div>
                <p className="mt-2 text-gray-600">{userData.career_goals}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center space-x-3">
                  <Certificate className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-medium text-gray-900">Current Certifications</h3>
                </div>
                <p className="mt-2 text-gray-600">{userData.certifications || "No certifications yet"}</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center space-x-3">
                  <Settings className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-medium text-gray-900">Learning Style</h3>
                </div>
                <p className="mt-2 text-gray-600">{userData.learning_preferences}</p>
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{course.duration}</span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                        {course.level}
                      </span>
                    </div>
                    <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;