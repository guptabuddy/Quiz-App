import { useRef } from "react";

export default function Answers({ selectedAnswer, answers, onSelect, answerState }) {
	const shuffledAnswers = useRef();
	if (!shuffledAnswers.current) {
		// This below line is going to make a copy of the available answers options for Each question (according to the activeQuestionIndex)
		shuffledAnswers.current = [...answers];

		// When we have read the last Question, then in the next iteration, the activeQuestionIndex will be equal to the length of the "userAnswers" array, and that index QUESTION does not exist (as length is 1 greater than the Index), so in last it will give us an error if we put this above line before the if(activeQuestionIndex === QUESTIONS.length) condition.
		// Because that index Question does not exist.
		shuffledAnswers.current.sort(() => Math.random() - 0.5);
		// sort method sorts the array in place, so we made a copy of the available answers options for Each question (according to the activeQuestionIndex) and then sorted it randomly.
	}

	return (
		<ul id="answers">
			{/* {QUESTIONS[activeQuestionIndex].answers.map((answer) => ( */}
			{shuffledAnswers.current.map((answer) => {
				const isSelected = answer === selectedAnswer;
				let cssClass = "";

				if (answerState === "answered" && isSelected) {
					cssClass = "selected";
				}
				if ((answerState === "correct" || answerState === "wrong") && isSelected) {
					// cssClass = { answerState };
					cssClass = answerState;
					// answerState is a State value (a variable), and we are not using it inside the JSX code, so we do not need the curly braces.
				}
				return (
					<li key={answer} className="answer">
						<button onClick={() => onSelect(answer)} className={cssClass}>
							{answer}
						</button>
					</li>
				);
			})}
		</ul>
	);
}
