import QuestionDataService from "../services/QuestionService";

const Question = ({ question, questions, setQuestions, userType }) => {
	const updateQuestion = (question, answered, vote) => {
		question.answered = answered;
		question.vote = vote;
		QuestionDataService.update(question.id, question)
			.then((response) => {
				setQuestions([...questions]);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<div className="mt-3 p-3 shadow rounded">
			<h5>Question</h5>
			<h6>{question.vote} votes</h6>
			<h6>{question.answered ? "Answered" : "Not answered"}</h6>
			<p className="mt-2">{question.content}</p>
			{userType == "participant" ? (
				<button
					className="btn btn-primary mt-2"
					onClick={() => {
						updateQuestion(question, question.answered, question.vote + 1);
					}}
				>
					Upvote
				</button>
			) : (
				<button
					className="btn btn-primary mt-2"
					onClick={() => {
						updateQuestion(question, true, question.vote);
					}}
				>
					Answer
				</button>
			)}
		</div>
	);
};

export default Question;
