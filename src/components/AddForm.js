import { useState } from "react";

const AddForm = ({ sendQuestion, sessionCode }) => {
	const [question, setQuestion] = useState("");
	const handleSubmit = (e) => {
		e.preventDefault();
		if (question) {
			sendQuestion({ content: question, sessionCode: sessionCode });
			setQuestion("");
		}
	};
	return (
		<form onSubmit={handleSubmit} className="bg-light p-3 rounded shadow mt-3">
			<div className="form-group">
				<label htmlFor="question" className="mb-3">
					Ask a question to the presenter!
				</label>
				<textarea
					className="form-control mb-3"
					id="question"
					onChange={(e) => setQuestion(e.target.value)}
					rows="3"
					placeholder="Enter your question"
					value={question}
				></textarea>
				<button className="btn btn-success" type="submit">
					Add Question
				</button>
			</div>
		</form>
	);
};

export default AddForm;
