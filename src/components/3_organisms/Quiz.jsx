import React, { useState } from "react";
import { quizData } from "../../data/quizData";

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    if (isAnswered) return; // Jangan biarkan memilih lagi jika sudah dijawab

    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  // Fungsi untuk menentukan warna tombol jawaban
  const getButtonClass = (option) => {
    if (!isAnswered) return "bg-gray-200 hover:bg-cyan-500 hover:text-white";
    if (option === currentQuestion.correctAnswer) return "bg-green-500 text-white";
    if (option === selectedAnswer) return "bg-red-500 text-white";
    return "bg-gray-200 opacity-50";
  };

  if (showResult) {
    const getResultMessage = () => {
      const percentage = (score / quizData.length) * 100;
      if (percentage === 100) return "Sempurna! Pemahaman Anda luar biasa! 🏆";
      if (percentage >= 70) return "Kerja Bagus! Anda sudah sangat paham. 👍";
      return "Jangan Menyerah! Coba lagi untuk lebih paham. 💪";
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Hasil Kuis Selesai</h2>
        <p className="text-lg mb-2">{getResultMessage()}</p>
        <p className="text-xl mb-6">
          Skor Akhir Anda: <strong>{score}</strong> dari {quizData.length}
        </p>
        <button onClick={restartQuiz} className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      {/* --- PROGRESS BAR --- */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}></div>
      </div>

      {/* Header Pertanyaan */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Pertanyaan {currentQuestionIndex + 1}/{quizData.length}
        </h2>
        <p className="text-gray-700 mt-2 text-lg">{currentQuestion.question}</p>
      </div>

      {/* Pilihan Jawaban */}
      <div className="space-y-4">
        {currentQuestion.options.map((option) => (
          <button key={option} onClick={() => handleAnswerClick(option)} disabled={isAnswered} className={`w-full font-semibold p-3 rounded-lg text-left transition-colors duration-300 ${getButtonClass(option)}`}>
            {option}
          </button>
        ))}
      </div>

      {/* Penjelasan dan Tombol Lanjut */}
      {isAnswered && (
        <div className="mt-6 text-center border-t pt-4">
          <p className="text-gray-600 mb-4">{currentQuestion.explanation}</p>
          <button onClick={handleNextQuestion} className="bg-emerald-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-emerald-700">
            Lanjut
          </button>
        </div>
      )}
    </div>
  );
}
