import { question, questions } from "@/util/questions";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";

interface IProps {
  totalNumberOfQuestionsInQuiz: number;
  endQuiz: (finalScore: number) => void;
}
export const DoingQuiz = ({
  totalNumberOfQuestionsInQuiz,
  endQuiz,
}: IProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<question>(
    questions[0]
  );
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [answeredQuestion, setAnsweredQuestion] = useState(false);
  const [lastQuestionCorrect, setLastQuestionCorrect] = useState(true);
  type possibleQuestionAnswerType = "A" | "B" | "C" | "D";
  const possibleQuestionAnswers: possibleQuestionAnswerType[] = [
    "A",
    "B",
    "C",
    "D",
  ];
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const getRandomQuestion = () => {
    const newQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(newQuestion);
  };

  const answerQuestion = (selectAnswer: possibleQuestionAnswerType) => {
    setAnsweredQuestion(true);
    if (currentQuestion.answer === selectAnswer) {
      setCurrentScore(currentScore + 1);
      setLastQuestionCorrect(true);
    } else {
      setLastQuestionCorrect(false);
    }
  };

  const moveToNextQuestion = () => {
    setAnsweredQuestion(false);
    if (currentQuestionNumber + 1 === totalNumberOfQuestionsInQuiz) {
      endQuiz(currentScore);
    } else {
      getRandomQuestion();
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    }
  };

  return (
    <>
      <div>Current Score : {currentScore}</div>
      <div>Total Number of Questions :{totalNumberOfQuestionsInQuiz} </div>
      <div>
        Question {currentQuestionNumber + 1} : {currentQuestion?.question}
      </div>

      <div className="p">
        <div>A : {currentQuestion?.A}</div>
        <div>B : {currentQuestion?.B}</div>
        <div>C : {currentQuestion?.C}</div>
        <div>D : {currentQuestion?.D}</div>
      </div>
      {answeredQuestion ? (
        <div className="flex flex-col ">
          {lastQuestionCorrect ? (
            <div>You got the answer correct </div>
          ) : (
            <div>
              You got the answer wrong. The correct answer is{" "}
              {currentQuestion[currentQuestion?.answer]}
            </div>
          )}
          <div className=" p-2 w-auto">
            <Button
              onClick={(event) => {
                event.stopPropagation();
                moveToNextQuestion();
              }}
            >
              Next Question
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex space-x-1 py-4">
          {possibleQuestionAnswers.map((option) => (
            <Button
              key={option}
              onClick={(event) => {
                event.stopPropagation();
                answerQuestion(option);
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};
