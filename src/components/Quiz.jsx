import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";

export default function Quiz() {
	// const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
	const [answerState, setAnswerState] = useState("");
	const [userAnswers, setUserAnswers] = useState([]);

	const activeQuestionIndex = answerState === "" ? userAnswers.length : userAnswers.length - 1;

	const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = useCallback(
		function handleSelectAnswer(selectedAnswer) {
			setAnswerState("answered");
			setUserAnswers((prevUserAnswers) => {
				return [...prevUserAnswers, selectedAnswer];
			});
			// console.log(userAnswers);

			setTimeout(() => {
				if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
					setAnswerState("correct");
				} else {
					setAnswerState("wrong");
				}

				setTimeout(() => {
					setAnswerState("");
				}, 2000);
			}, 1000);
		},
		[activeQuestionIndex]
	);

	const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

	if (quizIsComplete) {
		// In above line we are checking that the Questions are completed, if yes then we will render this below "Quiz Completed" section.
		return (
			<div id="summary">
				<img src={quizCompleteImg} alt="Trophy Icon" />
				<h2>Quiz Completed</h2>
			</div>
		);
	}

	return (
		<div id="quiz">
			<div id="question">
				<QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} key={activeQuestionIndex} />
				<h2>{QUESTIONS[activeQuestionIndex].text}</h2>
				<Answers
					selectedAnswer={userAnswers[userAnswers.length - 1]}
					answers={QUESTIONS[activeQuestionIndex].answers}
					onSelect={handleSelectAnswer}
					answerState={answerState}
					key={activeQuestionIndex}
				/>
			</div>
		</div>
	);
}
