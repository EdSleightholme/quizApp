import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { emailValid } from "../util/validators";
import { User } from "../util/localStorage";
import { question, questions } from "@/util/questions";
import { Modal } from "@/components/Modal";
import { SettingsModal } from "@/components/SettingsModal";

interface IProps {
  user?: User;
  numberOfQuestionsToAsk: number;
  logOut: () => void;
}

export const QuizPage = ({ user, numberOfQuestionsToAsk, logOut }: IProps) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<question>();
  const [viewHighScores, setViewHighScores] = useState(false);

  useEffect(() => {
    getRandomQuestion();
  }, []);

  const getRandomQuestion = () => {
    const newQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(newQuestion);
  };
  return (
    <div>
      {viewHighScores && (
        <Modal
          onClose={() => {
            setViewHighScores(false);
          }}
        >
          <SettingsModal user={user} highScore={highScore} logOut={logOut} />
        </Modal>
      )}
      <h1 className=" text-9xl underline">Quiz App</h1>
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
      <div className="flex space-x-1 py-4">
        <Button>A</Button>
        <Button>B</Button>
        <Button>C</Button>
        <Button>D</Button>
      </div>
      <div className=" p-2 w-auto">
        <Button onClick={() => setViewHighScores(true)}>Settings</Button>
      </div>
    </div>
  );
};
