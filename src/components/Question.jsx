import { useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";

export default function Question({ onSelectAnswer, onSkipAnswer, index }) {
	const [answer, setAnswer] = useState({ selectedAnswer: "", isCorrect: null });

	function handleSelectAnswer(answer) {
		setAnswer({
			selectedAnswer: answer,
			// isCorrect: answer === QUESTIONS[index].answers[0],
			isCorrect: null,
			// Here, instead of setting the above value to check whether the answer is correct or not, we are using null because for 1sec after the answer is selected we will not show whether the answer is correct or not.
		});

		setTimeout(() => {
			setAnswer({
				selectedAnswer: answer,
				isCorrect: answer === QUESTIONS[index].answers[0],
			});

			setTimeout(() => {
				onSelectAnswer(answer);
			}, 2000);
		}, 1000);
	}

	let answerState = "";
	if (answer.selectedAnswer && answer.isCorrect !== null) {
		answerState = answer.isCorrect ? "correct" : "wrong";
	} else if (answer.selectedAnswer) {
		answerState = "answered";
	}

	return (
		<div id="question">
			<QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
			<h2>{QUESTIONS[index].text}</h2>
			<Answers
				selectedAnswer={answer.selectedAnswer}
				answers={QUESTIONS[index].answers}
				onSelect={handleSelectAnswer}
				answerState={answerState}
			/>
		</div>
	);
}

// Get rid of passing multiple props from Quiz to Question component, and move the Logic to the Question component. Also disable answers if one answer is selected.
