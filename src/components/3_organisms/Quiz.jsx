import React, { useState } from "react";
import { quizData } from "../../data/quizData";

// Komponen Quiz sekarang menerima prop onComplete
export default function Quiz({ onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // State baru untuk mencatat semua jawaban
  const [answersLog, setAnswersLog] = useState([]);

  const currentQuestion = quizData[currentQuestionIndex];

  const handleAnswerClick = (answer) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(answer);

    // Catat jawaban
    setAnswersLog((prevLog) => [
      ...prevLog,
      {
        question: currentQuestion.question,
        chosenAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: answer === currentQuestion.correctAnswer,
        explanation: currentQuestion.explanation,
      },
    ]);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      onComplete(answersLog);
    }
  };

  const getButtonClass = (option) => {
    if (!isAnswered) return "bg-gray-200 hover:bg-cyan-500 hover:text-white";
    if (option === currentQuestion.correctAnswer) return "bg-green-500 text-white";
    if (option === selectedAnswer) return "bg-red-500 text-white";
    return "bg-gray-200 opacity-50";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}></div>
      </div>

      {/* Konten Pertanyaan */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Pertanyaan {currentQuestionIndex + 1}/{quizData.length}
        </h2>
        <p className="text-gray-700 mt-2 text-lg">{currentQuestion.question}</p>
      </div>

      <div className="space-y-4">
        {currentQuestion.options.map((option) => (
          <button key={option} onClick={() => handleAnswerClick(option)} disabled={isAnswered} className={`w-full font-semibold p-3 rounded-lg text-left transition-colors ${getButtonClass(option)}`}>
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-6 text-center border-t pt-4">
          <p className="text-gray-600 mb-4">{currentQuestion.explanation}</p>
          <button onClick={handleNextQuestion} className="bg-emerald-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-emerald-700">
            {currentQuestionIndex < quizData.length - 1 ? "Lanjut" : "Lihat Hasil"}
          </button>
        </div>
      )}
    </div>
  );
}
