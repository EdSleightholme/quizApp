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
    if (numberOfQuestions < 1) {
      setQuestionError("Must be a positive number of questions");
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
      <div>Set Up Quiz</div>
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
      <Button onClick={attemptToStartQuiz}>Start Quiz</Button>
    </>
  );
};
