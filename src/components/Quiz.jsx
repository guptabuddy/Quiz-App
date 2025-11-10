import { useState } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
	// const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const activeQuestionIndex = userAnswers.length;

	function handleSelectAnswer(selectedAnswer) {
		setUserAnswers((prevUserAnswers) => {
			return [...prevUserAnswers, selectedAnswer];
		});
	}
	// console.log(userAnswers);

	if (activeQuestionIndex === QUESTIONS.length) {
		// In above line we are checking that the Questions are completed, if yes then we will render this below "Quiz Completed" section.
		return (
			<div id="summary">
				<img src={quizCompleteImg} alt="" />
				<h2>Quiz Completed</h2>
			</div>
		);
	}

	// This below line is going to make a copy of the available answers options for Each question (according to the activeQuestionIndex)
	const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
	// When we have read the last Question, then in the next iteration, the activeQuestionIndex will be equal to the length of the "userAnswers" array, and that index QUESTION does not exist (as length is 1 greater than the Index), so in last it will give us an error if we put this above line before the if(activeQuestionIndex === QUESTIONS.length) condition.
	// Because that index Question does not exist.
	shuffledAnswers.sort(() => Math.random() - 0.5);
	// sort method sorts the array in place, so we made a copy of the available answers options for Each question (according to the activeQuestionIndex) and then sorted it randomly.

	return (
		<div id="quiz">
			<div id="questions">
				<h2>{QUESTIONS[activeQuestionIndex].text}</h2>
				<ul id="answers">
					{/* {QUESTIONS[activeQuestionIndex].answers.map((answer) => ( */}
					{shuffledAnswers.map((answer) => (
						<li key={answer} className="answer">
							<button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
