import React, { useState, useEffect, useCallback } from "react";
import { Question } from "./Question";
import { loadQuestions } from "../helpers/QuestionsHelpers";
import { HUD } from "./HUD";
import { SaveScoreForm } from "./SaveScoreForm";

export const Game = ({ history }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    loadQuestions()
      .then((questions) => setQuestions(questions))

      .catch((err) => console.error(err));
  }, []);

  const scoreSaved = () => {
    history.push("/");
  };

  const changeQuestion = useCallback(
    (bonus = 0) => {
      if (questions.length === 0) {
        setDone(true);
        return setScore((prevState) => prevState + bonus);
      }

      // get a random index of a question
      const randomQuestionIndex = Math.floor(Math.random() * questions.length);
      // we set the current question to the question at that random index
      const currentQuestion = questions[randomQuestionIndex];
      // remove that question from the questions going forward
      const remainingQuestions = [...questions];
      remainingQuestions.splice(randomQuestionIndex, 1);

      // update the state to reflect these changes
      setQuestions(remainingQuestions);
      setCurrentQuestion(currentQuestion);
      setIsLoading(false);
      setScore((prevState) => prevState + bonus);
      setQuestionNumber((prevState) => prevState + 1);
    },
    [questions, setQuestionNumber, setIsLoading, setQuestions, setCurrentQuestion]
  );

  useEffect(() => {
    if (!currentQuestion && questions.length) {
      changeQuestion();
    }
  }, [currentQuestion, questions, changeQuestion]);

  return (
    <>
      {!done && isLoading && <div id="loader" />}

      {!done && !isLoading && currentQuestion && (
        <>
          <HUD score={score} questionNumber={questionNumber} />
          <Question question={currentQuestion} changeQuestion={changeQuestion} />
        </>
      )}
      {done && <SaveScoreForm score={score} scoreSaved={scoreSaved} />}
    </>
  );
};
