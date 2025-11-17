import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
	// const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
	// const [answerState, setAnswerState] = useState("");
	const [userAnswers, setUserAnswers] = useState([]);

	// const activeQuestionIndex = answerState === "" ? userAnswers.length : userAnswers.length - 1;
	const activeQuestionIndex = userAnswers.length;

	const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

	const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
		// setAnswerState("answered");
		setUserAnswers((prevUserAnswers) => {
			return [...prevUserAnswers, selectedAnswer];
		});
		// console.log(userAnswers);

		// setTimeout(() => {
		// 	if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
		// 		setAnswerState("correct");
		// 	} else {
		// 		setAnswerState("wrong");
		// 	}

		// 	setTimeout(() => {
		// 		setAnswerState("");
		// 	}, 2000);
		// }, 1000);
	}, []);

	const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

	if (quizIsComplete) {
		// In above line we are checking that the Questions are completed, if yes then we will render this below "Quiz Completed" section.
		return <Summary userAnswers={userAnswers} />;
	}

	return (
		<div id="quiz">
			<Question
				key={activeQuestionIndex}
				index={activeQuestionIndex}
				// selectedAnswer={userAnswers[userAnswers.length - 1]}
				// answerState={answerState}
				onSelectAnswer={handleSelectAnswer}
				onSkipAnswer={handleSkipAnswer}
			/>
		</div>
	);
}
