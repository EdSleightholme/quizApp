export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export const getLoginDetails = () => {
  if (localStorage.getItem("loggedIn")) {
    const userToReturn: User = {
      firstName: localStorage.getItem("firstName") ?? "",
      lastName: localStorage.getItem("lastName") ?? "",
      email: localStorage.getItem("email") ?? "",
    };
    return userToReturn;
  } else {
    return;
  }
};

export const getHighScoreLocalStorage = () => {
  return localStorage.getItem("highScore");
};

export const setHighScoreLocalStorage = (highScore: string) => {
  localStorage.setItem("highScore", highScore);
};

export const logInLocalStorage = (user: User) => {
  localStorage.setItem("firstName", user.firstName);
  localStorage.setItem("lastName", user.lastName);
  localStorage.setItem("email", user.email);
  localStorage.setItem("loggedIn", "true");
};

export const logOut = () => {
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
  localStorage.removeItem("email");
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("highScore");
};
