import { useState } from "react";
import { Button } from "../components/Button";
import {
  User,
  getHighScoreLocalStorage,
  setHighScoreLocalStorage,
} from "../util/localStorage";
import { Modal } from "@/components/Modal";
import { SetUpQuiz } from "./QuizPage/SetUpQuiz";
import { SettingsModalContent } from "./QuizPage/SettingsModalContent";
import { EndQuiz } from "./QuizPage/EndQuiz";
import { DoingQuiz } from "./QuizPage/DoingQuiz";

interface IProps {
  user?: User;
  logOut: () => void;
}

export const QuizPage = ({ user, logOut }: IProps) => {
  const [highScore, setHighScore] = useState(
    getHighScoreLocalStorage() ?? undefined
  );
  const [viewSettings, setViewSettings] = useState(false);
  const [totalNumberOfQuestionsInQuiz, setTotalNumberOfQuestionsInQuiz] =
    useState(5);
  const [displayEndQuizScreen, setDisplayEndQuizScreen] = useState(false);
  const [displaySetUpQuizScreen, setDisplaySetUpQuizScreen] = useState(true);
  const [displayDoingQuizScreen, setDisplayDoingQuizScreen] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const endQuiz = (finalScore: number) => {
    setFinalScore(finalScore);
    setDisplayEndQuizScreen(true);
    setDisplayDoingQuizScreen(false);
    const percentCorrect = Math.round(
      (finalScore / totalNumberOfQuestionsInQuiz) * 100
    );
    if (highScore) {
      const [oldHighScore, oldHighNumberQuestions] = highScore.split("/");
      const oldhighScorePercent = Math.round(
        (parseInt(oldHighScore) / parseInt(oldHighNumberQuestions)) * 100
      );
      if (percentCorrect > oldhighScorePercent) {
        setHighScoreLocalStorage(
          finalScore + "/" + totalNumberOfQuestionsInQuiz
        );
        setHighScore(finalScore + "/" + totalNumberOfQuestionsInQuiz);
      }
    } else {
      setHighScoreLocalStorage(finalScore + "/" + totalNumberOfQuestionsInQuiz);
      setHighScore(finalScore + "/" + totalNumberOfQuestionsInQuiz);
    }
  };

  const startQuiz = (numberQuestions: number) => {
    setTotalNumberOfQuestionsInQuiz(numberQuestions);
    setDisplayDoingQuizScreen(true);
    setDisplaySetUpQuizScreen(false);
  };

  const goToSetupPage = () => {
    setDisplaySetUpQuizScreen(true);
    setDisplayEndQuizScreen(false);
  };

  return (
    <div>
      {viewSettings && (
        <Modal
          onClose={() => {
            setViewSettings(false);
          }}
        >
          <SettingsModalContent
            user={user}
            highScore={highScore ?? ""}
            logOut={logOut}
          />
        </Modal>
      )}
      <h1 className=" text-9xl underline">Quiz App</h1>

      {displaySetUpQuizScreen && <SetUpQuiz startQuiz={startQuiz} />}
      {displayEndQuizScreen && (
        <EndQuiz
          finalScore={finalScore}
          totalNumberOfQuestionsInQuiz={totalNumberOfQuestionsInQuiz}
          goToSetupQuiz={goToSetupPage}
        />
      )}
      {displayDoingQuizScreen && (
        <DoingQuiz
          totalNumberOfQuestionsInQuiz={totalNumberOfQuestionsInQuiz}
          endQuiz={endQuiz}
        />
      )}
      <div className=" p-2 w-auto">
        <Button onClick={() => setViewSettings(true)}>Settings</Button>
      </div>
    </div>
  );
};
