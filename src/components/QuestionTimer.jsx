import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		console.log("Timer started");
		setTimeout(() => {
			onTimeout();
		}, timeout);

		// return () => {
		// 	clearTimeout(timerId);
		// };
	}, [timeout, onTimeout]);

	useEffect(() => {
		console.log("Interval Started");
		setInterval(() => {
			setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
		}, 100);

		// return () => {
		// 	clearInterval(intervalId);
		// };
	}, []);

	return <progress id="question-time" max={timeout} value={remainingTime} />;
}
