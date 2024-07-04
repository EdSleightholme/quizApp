"use client";
import { useEffect, useState } from "react";
import "./App.css";
import {
  User,
  getLoginDetails,
  logInLocalStorage,
  logOut,
} from "@/util/localStorage";
import { Login } from "@/pages/Login";
import { QuizPage } from "@/pages/QuizPage";

function App() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (newUser: User) => {
    setUser(newUser);
    setLoggedIn(true);
    logInLocalStorage(newUser);
  };

  useEffect(() => {
    const user = getLoginDetails();
    if (user) {
      setLoggedIn(true);
      setUser(user);
    }
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {loading ? (
        <>
          <h1 className=" p-10">LOADING</h1>
        </>
      ) : loggedIn ? (
        <QuizPage
          user={user}
          logOut={() => {
            setLoggedIn(false);
            setUser(undefined);
            logOut()

          }}
        />
      ) : (
        <Login logIn={logIn} />
      )}
    </div>
  );
}

export default App;
