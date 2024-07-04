# Quiz App 
This is a simple app that lets the user do a quiz of a user set size set. It also has a simple login form and allows the user to set high scores and saves information to local storage 

## Getting Started

To run this project 
1. Clone this github repo
2. Run ``` npm i ```  command in the the root folder of this project. This will install all the dependencies required
3. Run ``` npm run dev ```  command in the the root folder of this project. This will run the project on `http://localhost:3000`

## Things to add in the future
- Add testing. Cypress for end to end tests and jst for unit tests. 
- Add prettier. So all code is styled the same way automatically. 
- Fix bug where it is possible to have the same question twice in the same quiz. Odds are currently of this bugs occurs as have over 600 questions
- Rig up questions to a question api so dont have to maintain a database of questions  
- Set up a backend so can store users and have more than one user at a time
- Improve design of site. See how other quiz apps do it and come up with a standardized design for titles , sub titles, buttons , inputs 

## Task Spec
Registration and quiz/trivia game with Local Storage

Build a React registration page and quiz that allows users to register, do a chat and see the scoring on the end.

Tasks 1:
Create registration page UI with first name, last name and email fields and submit button.

Tasks 2:
Create quiz/trivia game in a chat format with min 5 questions.

Tasks 3:
Create the score UI page with information for a user about results they get.

Tips:
Implement local storage to persist tasks across page refreshes;
Use component libraries as (MUI, Mantine) to speed up your work;
All 3 tasks should be a one flow of actions;

### Comments on spec given
- Are first name, last name and email all required fields? Some cultures don't use first or last name. Currently have made first name, last name not required
- How do pervious scores work? Spec is ambiguous about how this should work? Currently just holds the single highest score of the currently logged in user.
- quiz/trivia game in a chat format is to ambiguous. What is chat format? Went with a set of multiple choice questions for now
- is app expected to keep details of previous users? Currently app will "forget" a user when they log out.    