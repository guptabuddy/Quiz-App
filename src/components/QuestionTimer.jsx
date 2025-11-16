import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
	const [remainingTime, setRemainingTime] = useState(timeout);

	useEffect(() => {
		console.log("Timer started");

		// const timer = setTimeout(() => {
		// 	onTimeout();
		// }, timeout);
		//We have to change the way we have executed the above code, because when we pass null to onTimeout, it will create issue. So we are using the below code.
		const timer = setTimeout(() => {
			if (onTimeout) {
				onTimeout();
			}
		}, timeout);
		// OR
		// const timer = setTimeout(onTimeout, timeout);

		return () => {
			clearTimeout(timer);
		};
	}, [timeout, onTimeout]);

	useEffect(() => {
		console.log("Interval Started");
		const interval = setInterval(() => {
			setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
		}, 100);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return <progress id="question-time" max={timeout} value={remainingTime} className={mode} />;
}
