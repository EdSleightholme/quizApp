import { Button } from "../../components/Button";

interface IProps {
  finalScore: number;
  totalNumberOfQuestionsInQuiz: number;
  goToSetupQuiz: () => void;
}
export const EndQuiz = ({
  finalScore: currentScore,
  totalNumberOfQuestionsInQuiz,
  goToSetupQuiz,
}: IProps) => {
  return (
    <>
      <h2 className="text-lg underline">Quiz Complete</h2>
      <div>
        You scored {currentScore} out of {totalNumberOfQuestionsInQuiz}{" "}
      </div>
      <div>
        You got{" "}
        {Math.round((currentScore / totalNumberOfQuestionsInQuiz) * 100)}%
        correct.
      </div>
      <div className="p-2">
        <Button onClick={goToSetupQuiz}>Start A New Quiz</Button>
      </div>
    </>
  );
};
