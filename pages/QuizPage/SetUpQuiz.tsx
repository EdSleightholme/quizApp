import { Button } from "../../components/Button";
import { TextInput } from "@/components/TextInput";
import { useState } from "react";

interface IProps {
  startQuiz: (numberQuestions: number) => void;
}
export const SetUpQuiz = ({ startQuiz }: IProps) => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [questionError, setQuestionError] = useState("");

  const attemptToStartQuiz = () => {
    if (numberOfQuestions < 5) {
      setQuestionError("Must have at least 5 questions");
      return;
    }
    if (numberOfQuestions > 100) {
      setQuestionError("Must be less than 100 questions");
      return;
    }
    startQuiz(numberOfQuestions);
  };

  return (
    <>
      <h2 className="text-lg underline">Set Up Quiz</h2>
      <div>How many questions should the quiz be?</div>
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
      <div className="p-2">
        <Button onClick={attemptToStartQuiz}>Start Quiz</Button>
      </div>
    </>
  );
};
