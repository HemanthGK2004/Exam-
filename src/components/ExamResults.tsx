import React, { useMemo } from "react";
import { Question } from "../types";
import { CheckCircle, XCircle } from "lucide-react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExamResultsProps {
  answers: Record<string, string>;
  questions: Question[];
  userName: string; // User's name
  userPhoto: string; // URL of user's photo
}

export const ExamResults: React.FC<ExamResultsProps> = ({
  answers,
  questions,
  userName,
  userPhoto,
}) => {
  const { correctCount, score, incorrectCount } = useMemo(() => {
    const correctCount = questions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const incorrectCount = questions.length - correctCount;
    return {
      correctCount,
      incorrectCount,
      score: ((correctCount / questions.length) * 100).toFixed(1),
    };
  }, [answers, questions]);

  const pieData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [correctCount, incorrectCount],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

/*** Generate PDF Report ***/
const handleDownloadPDF = () => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Exam Results', 15, 20);

  // Display user's name
  doc.setFontSize(12);
  doc.text(`Student Name: ${userName || "N/A"}`, 15, 30);
  doc.text(`Score: ${score}%`, 15, 40);
  doc.text(`Correct Answers: ${correctCount}`, 15, 50);
  doc.text(`Incorrect Answers: ${incorrectCount}`, 15, 60);
  doc.text('Detailed Review:', 15, 70);

  // Add User Photo if available
  if (userPhoto) {
    doc.addImage(userPhoto, 'JPEG', 150, 10, 40, 40); // Adjust position & size
  }

  let yPos = 80;
  questions.forEach((question, index) => {
    if (yPos > 270) {  // Avoid text overflowing the page
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(11);
    doc.text(`${index + 1}. ${question.text}`, 15, yPos);
    yPos += 10;
    
    doc.setFontSize(10);
    doc.text(`Your Answer: ${answers[question.id] || 'No answer'}`, 20, yPos);
    yPos += 10;

    doc.text(`Correct Answer: ${question.correctAnswer}`, 20, yPos);
    yPos += 10;

    // Wrap long explanations
    const explanationText = doc.splitTextToSize(`Explanation: ${question.explanation}`, 170);
    doc.text(explanationText, 20, yPos);
    yPos += explanationText.length * 5 + 10;
  });

  doc.save(`Exam_Results_${userName}.pdf`);
};


  /*** Generate CSV Report ***/
  const handleDownloadCSV = () => {
    let csvContent = `User,${userName}\nScore,${score}%\nCorrect Answers,${correctCount}\nIncorrect Answers,${incorrectCount}\n\n`;
    csvContent += "Question,Your Answer,Correct Answer,Explanation\n";

    questions.forEach((question) => {
      const userAnswer = answers[question.id] || "No Answer";
      csvContent += `"${question.text}","${userAnswer}","${question.correctAnswer}","${question.explanation}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${userName}_Exam_Results.csv`);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg space-y-8 shadow-lg">
      {/* Detailed Question Review */}
      <div className="space-y-6">
        {questions.map((question) => {
          const isCorrect = answers[question.id] === question.correctAnswer;
          return (
            <div key={question.id} className="border-t border-slate-700 pt-4">
              <div className="flex items-start gap-3">
                {/* Correct or Incorrect Icon */}
                {isCorrect ? (
                  <CheckCircle className="text-green-500 mt-1" size={20} />
                ) : (
                  <XCircle className="text-red-500 mt-1" size={20} />
                )}

                <div>
                  <p className="text-slate-200 font-medium mb-2">{question.text}</p>
                  <p className={`mb-1 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    Your answer: {answers[question.id] || <span className="italic text-slate-400">No answer</span>}
                  </p>
                  {!isCorrect && (
                    <p className="text-green-400 mb-2">Correct answer: {question.correctAnswer}</p>
                  )}
                  <p className="text-slate-300 text-sm bg-slate-700/50 p-3 rounded">{question.explanation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Info - Displayed AFTER Questions */}
      <div className="flex items-center gap-4 mt-8 border-t border-gray-700 pt-6">
        {userPhoto && <img src={userPhoto} alt="User" className="w-16 h-16 rounded-full border" />}
        <div>
          <h2 className="text-2xl font-bold text-slate-100">{userName}'s Exam Results</h2>
          <p className="text-slate-400">Performance Summary</p>
        </div>
      </div>

      {/* Exam Score Summary */}
      <div className="text-center">
        <p className={`text-3xl font-bold ${score >= 70 ? "text-green-400" : "text-red-400"} mb-4`}>
          {score}%
        </p>
        <p className="text-slate-300">
          You answered <span className="font-semibold">{correctCount}</span> out of{" "}
          <span className="font-semibold">{questions.length}</span> questions correctly.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-4 mt-4">
          <div
            className={`h-4 rounded-full ${score >= 70 ? "bg-green-500" : "bg-red-500"}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      {/* Pie Chart Visualization */}
      <div className="flex justify-center">
        <div className="w-60">
          <Pie data={pieData} />
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex justify-center gap-4">
        <button onClick={handleDownloadPDF} className="bg-blue-500 text-white px-4 py-2 rounded">
          Download PDF
        </button>
        <button onClick={handleDownloadCSV} className="bg-green-500 text-white px-4 py-2 rounded">
          Download CSV
        </button>
      </div>
    </div>
  );
};
