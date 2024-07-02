import { useState } from "react";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { emailValid } from "../util/validators";
import { User } from "../util/localStorage";

interface IProps {
  logIn: (newUser: User) => void;
}

export const Login = ({ logIn }: IProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const logInAttempt = () => {
    const isEmailValid = emailValid(email);
    if (isEmailValid) {
      logIn({ firstName: firstName ?? "", lastName: lastName ?? "", email });
    } else {
      setError("Email Is Invalid");
    }
  };
  return (
    <div>
      <h1 className=" text-9xl underline">Quiz App</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          logInAttempt();
        }}
      >
        <TextInput
          name="First Name"
          label="First Name"
          onChange={(newValue) => setFirstName(newValue)}
          value={firstName}
        />
        <TextInput
          name="Last Name"
          label="Last Name"
          onChange={(newValue) => setLastName(newValue)}
          value={lastName}
        />
        <TextInput
          name="Email"
          label="Email"
          onChange={(newValue) => setEmail(newValue)}
          value={email}
          error={!!error}
          helpText={error}
        />
        <Button submit>Log In</Button>
      </form>
    </div>
  );
};
