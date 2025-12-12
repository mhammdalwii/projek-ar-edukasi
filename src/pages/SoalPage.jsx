import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import QuizForm from "../components/3_organisms/QuizForm";
import Quiz from "../components/3_organisms/Quiz";
import QuizResult from "../components/3_organisms/QuizResult";

export default function SoalPage() {
  // 4 state: 'checking', 'form', 'quiz', 'result'
  const [currentView, setCurrentView] = useState("checking");

  const [userInfo, setUserInfo] = useState(null);
  const [answersLog, setAnswersLog] = useState(null);

  // Cek localStorage saat halaman dimuat
  useEffect(() => {
    const savedAttempt = localStorage.getItem("quizAttempt");
    if (savedAttempt) {
      const attempt = JSON.parse(savedAttempt);
      setUserInfo({ name: attempt.name, userClass: attempt.userClass });
      setAnswersLog(attempt.log);
      setCurrentView("result");
    } else {
      setCurrentView("form");
    }
  }, []);

  const handleQuizStart = (info) => {
    setUserInfo(info);
    setCurrentView("quiz");
  };

  const handleQuizComplete = (log) => {
    setAnswersLog(log);
    setCurrentView("result");
    // Penyimpanan data sekarang dilakukan di dalam QuizResult.jsx
  };

  const renderView = () => {
    switch (currentView) {
      case "checking":
        return <p className="text-center text-gray-600">Memeriksa status kuis...</p>;
      case "form":
        return <QuizForm onStart={handleQuizStart} />;
      case "quiz":
        return <Quiz onComplete={handleQuizComplete} />;
      case "result":
        return <QuizResult userInfo={userInfo} answersLog={answersLog} />;
      default:
        return <QuizForm onStart={handleQuizStart} />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gray-700 text-white p-4 shadow-md flex items-center">
        <Link to="/" className="mr-4 text-2xl">
          <IoArrowBack />
        </Link>
        <h1 className="text-xl font-bold">Latihan Soal</h1>
      </header>

      <main className="p-4 md:p-6 flex justify-center items-start">{renderView()}</main>
    </div>
  );
}
