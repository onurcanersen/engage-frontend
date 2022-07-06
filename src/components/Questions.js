import Question from "./Question";

const Questions = ({ questions, setQuestions, userType }) => {
	return (
		<div className="mb-5">
			{questions
				.sort((a, b) => b.vote - a.vote)
				.map((question, index) => (
					<Question
						question={question}
						questions={questions}
						setQuestions={setQuestions}
						userType={userType}
						key={index}
					/>
				))}
		</div>
	);
};

export default Questions;
