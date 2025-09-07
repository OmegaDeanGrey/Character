import React, { useState, useEffect, useRef } from "react";

const IQ = () => {
  const questions = [
    {
      question: "Which does not belong?",
      options: ["Mercury", "Venus", "Earth", "Mars", "Pluto"],
      answer: 4, // Pluto
    },
    {
      question: "Which does not belong?",
      options: ["Triangle", "Square", "Circle", "Pentagon", "Hexagon"],
      answer: 2, // Circle
    },
    {
      question: "Which does not belong?",
      options: ["Red", "Green", "Yellow", "Grey", "Purple"],
      answer: 3, // Grey
    },
    {
      question: "Which does not belong?",
      options: ["Shakespeare", "Hemingway", "Tolstoy", "Einstein", "Dickens"],
      answer: 3, // Einstein (scientist)
    },
    {
      question: "Which does not belong?",
      options: ["Violin", "Cello", "Flute", "Viola", "Bass"],
      answer: 2, // Flute
    },
    {
      question: "Which does not belong?",
      options: ["Iron", "Gold", "Silver", "Diamond", "Copper"],
      answer: 3, // Diamond
    },
    {
      question: "Which does not belong?",
      options: ["Amazon", "Google", "Microsoft", "Tesla", "Apple"],
      answer: 3, // Tesla
    },
    {
      question: "Which does not belong?",
      options: ["Sega", "NES", "Switch", "Wii", "GameBoy"],
      answer: 0, // Sega
    },
    {
      question: "Which does not belong?",
      options: ["Dog", "Cat", "Horse", "Elephant", "Gorilla"],
      answer: 4, // Gorilla
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAnswer = (index) => {
    if (finished) return;

    const isCorrect = index === questions[current].answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Correct");
    } else {
      setFeedback("❌ Incorrect");
    }

    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => {
        if (prev + 1 < questions.length) {
          return prev + 1;
        } else {
          setFinished(true);
          setScore((finalScore) => {
            saveResult(finalScore);
            return finalScore;
          });
          return prev;
        }
      });
      setFeedback("");
    }, 1000);
  };

  const saveResult = (finalScore) => {
    let resultValue = "1";
    if (finalScore >= 4 && finalScore <= 6) resultValue = "2";
    if (finalScore >= 7) resultValue = "3";
    localStorage.setItem("trialfourresults", resultValue);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {!finished ? (
        <div>
          <h2 className="text-xl font-bold mb-2">
            Question {current + 1} of {questions.length}
          </h2>
          <p className="mb-4">{questions[current].question}</p>
          <div className="space-y-2">
            {questions[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="block w-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
                id="iqbuttons"
              >
                {opt}
              </button>
            ))}
          </div>
          {feedback && <p className="mt-4 font-semibold">{feedback}</p>}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Quiz Finished</h2>
          <p>Your result has been recorded.</p>
        </div>
      )}
    </div>
  );
};

export default IQ;
