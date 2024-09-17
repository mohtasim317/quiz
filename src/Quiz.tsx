// You're given a CSS file for a multiple choice quiz, and you need to implement the component using React.

// When the component initially mounts, it should make an API request to the quiz API at:

// https://api.frontendexpert.io/api/fe/quiz

// This API expects GET requests with no query parameters. The API returns a JSON formatted array of quiz questions. Each question is an object with the question, an array of answers, and the correct answer. For example, the correct answer to this question is "useState", because it is at index 0:

// json
// Copy code
// {
//   "question": "Which of the following is a built-in React hook?",
//   "answers": [
//     "useState",
//     "useFetch",
//     "useLocalStorage",
//     "useTimeout"
//   ],
//   "correctAnswer": 0
// }
// Once the request to the API returns, the first quiz question should be displayed. The question should be in an h1 at the top of the component.

// Below the question should be the answers, which should each be an h2 with the text content of the answer. Each answer should also have an answer class. If an answer is clicked on, it should also be given the correct or incorrect class based on if the answer is the correct answer.

// Only one answer should be selectable at a time, and clicking other answers should have no effect until moving on to the next question.

// Below the answers should be two buttons with the text of Back and Next in that order. Both buttons should be initially disabled. The next button should only be enabled when an answer has been selected for the current question. When the next button is enabled and clicked on, it should change the question to the next question. On the last question, the next button should always be disabled.

// The back button should be enabled whenever not currently on the first question, even if an answer has not yet been selected. Clicking the back button should return to the previous question, but with the previously selected answer already selected.

// The complete HTML output of the Quiz component might look something like this after "useFetch" has been incorrectly selected on the first question:

// h1 Which of the following is a built-in React hook? /h1

// h2 useState /h2
// h2 useFetch (incorrect) /h2
// h2 useLocalStorage /h2
// h2 useTimeout /h2

// button Back (disabled) /button
// button Next /button

// Your component has already been rendered to the DOM inside of a #root div directly in the body with the CSS imported.

import React, { useEffect, useState } from "react";
import data from "../data.json";

type QuestionData = {
  question: string;
  answers: string[];
  correctAnswer: number;
};

// const QUIZ_API_BASE_URL = "https://api.frontendexpert.io/api/fe/quiz";

export default function Quiz() {
  const [questions, setQuestions] = useState<QuestionData[]>(data);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const currentQuestion = questions[questionNumber];

  //   const getQuestionData = async () => {
  //     const rawData = await fetch(QUIZ_API_BASE_URL);
  //     const jsonData = await rawData.json();
  //     setQuestions(jsonData);
  //   };

  //   useEffect(() => {
  // getQuestionsData()
  //   }, []);

  return (
    <>
      <h1>{currentQuestion.question}</h1>

      {currentQuestion.answers.map((answer, i) => {
        return (
          <Answer
            answer={answer}
            currentQuestion={currentQuestion}
            answerNumber={i}
          />
        );
      })}

      <button disabled>Back</button>
      <button>Next</button>
    </>
  );
}

function Answer({
  answer,
  currentQuestion,
  answerNumber,
}: {
  answer: string;
  currentQuestion: QuestionData;
  answerNumber: number;
}) {
  const [answerClass, setAnswerClass] = useState("answer");

  const buttonClick = () => {
    if (answerNumber === currentQuestion.correctAnswer) {
      setAnswerClass("answer correct");
    } else {
      setAnswerClass("answer incorrect");
    }
  };

  return (
    <>
      <h2 onClick={buttonClick} className={answerClass} key={answer}>
        {answer}
      </h2>
    </>
  );
}
