import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { emailValid } from "../util/validators";
import {
  User,
  getHighScoreLocalStorage,
  setHighScoreLocalStorage,
} from "../util/localStorage";
import { question, questions } from "@/util/questions";
import { Modal } from "@/components/Modal";
import { SettingsModal } from "@/components/SettingsModal";

interface IProps {
  user?: User;
  numberOfQuestionsToAsk: number;
  logOut: () => void;
}

export const QuizPage = ({ user, numberOfQuestionsToAsk, logOut }: IProps) => {
  type possibleQuestionAnswerType = "A" | "B" | "C" | "D";
  const possibleQuestionAnswers: possibleQuestionAnswerType[] = [
    "A",
    "B",
    "C",
    "D",
  ];

  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(
    getHighScoreLocalStorage() ?? undefined
  );
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<question>(
    questions[0]
  );
  const [viewSettings, setViewSettings] = useState(false);
  const [answeredQuestion, setAnsweredQuestion] = useState(false);
  const [lastQuestionCorrect, setLastQuestionCorrect] = useState(true);
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [questionError, setQuestionError] = useState("");
  const [endQuiz, setEndQuiz] = useState(false);
  const [setUpQuiz, setSetUpQuiz] = useState(true);
  const [doingQuiz, setDoingQuiz] = useState(false);

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const getRandomQuestion = () => {
    const newQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(newQuestion);
  };

  const moveToNextQuestion = () => {
    setAnsweredQuestion(false);
    if (currentQuestionNumber + 1 === numberOfQuestions) {
      setEndQuiz(true);
      setDoingQuiz(false);
      const percentCorrect = Math.round(
        (currentScore / numberOfQuestions) * 100
      );
      if (highScore) {
        const [oldHighScore, oldHighNumberQuestions] = highScore.split("/");
        const oldhighScorePercent = Math.round(
          (parseInt(oldHighScore) / parseInt(oldHighNumberQuestions)) * 100
        );
        if (percentCorrect > oldhighScorePercent) {
          setHighScoreLocalStorage(currentScore + "/" + numberOfQuestions);
          setHighScore(currentScore + "/" + numberOfQuestions);
        }
      } else {
        setHighScoreLocalStorage(currentScore + "/" + numberOfQuestions);
        setHighScore(currentScore + "/" + numberOfQuestions);
      }
    } else {
      getRandomQuestion();
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    }
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

  const startQuiz = () => {
    if (numberOfQuestions < 1) {
      setQuestionError("Must be a positive number of questions");
      return;
    }
    if (numberOfQuestions > 100) {
      setQuestionError("Must be less than 100 questions");
      return;
    }
    setCurrentQuestionNumber(0);
    setCurrentScore(0);
    getRandomQuestion();
    setDoingQuiz(true);
    setSetUpQuiz(false);
  };

  return (
    <div>
      {viewSettings && (
        <Modal
          onClose={() => {
            setViewSettings(false);
          }}
        >
          <SettingsModal
            user={user}
            highScore={highScore ?? ""}
            logOut={logOut}
          />
        </Modal>
      )}
      <h1 className=" text-9xl underline">Quiz App</h1>

      {setUpQuiz && (
        <>
          <div>Set Up Quiz</div>
          <div>How many questions Should the quiz be?</div>
          <TextInput
            name={"numberOfQuestions"}
            value={numberOfQuestions.toString()}
            onChange={(newValue) => {
              setNumberOfQuestions(parseInt(newValue));
            }}
            number
            error={!!questionError}
            helpText={questionError}
          />
          <Button onClick={startQuiz}>Start Quiz</Button>
        </>
      )}
      {endQuiz && (
        <>
          <h2>Quiz Complete</h2>
          <div>
            You scored {currentScore} out of {numberOfQuestions}{" "}
          </div>
          <div>
            You got {Math.round((currentScore / numberOfQuestions) * 100)}%
            correct.
          </div>
          <Button
            onClick={() => {
              setSetUpQuiz(true);
              setEndQuiz(false);
            }}
          >
            Start A New Quiz
          </Button>
        </>
      )}
      {doingQuiz && (
        <>
          <div>Current Score : {currentScore}</div>
          <div>Total Number of Questions :{numberOfQuestionsToAsk} </div>
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
      )}
      <div className=" p-2 w-auto">
        <Button onClick={() => setViewSettings(true)}>Settings</Button>
      </div>
    </div>
  );
};
