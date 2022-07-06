import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import AddForm from "../components/AddForm";
import Questions from "../components/Questions";
import QuestionDataService from "../services/QuestionService";

var stompClient = null;

const Participant = () => {
	const location = useLocation();
	const { sessionCode } = location.state;
	const [questions, setQuestions] = useState([]);
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		QuestionDataService.findBySessionCode(sessionCode)
			.then((response) => {
				setQuestions([...response.data]);
			})
			.catch((e) => {
				console.log(e);
			});
		if (refresh) {
			setRefresh(false);
		}
	}, [refresh]);
	useEffect(() => {
		if (questions) {
			const socket = new SockJS("http://localhost:8080/sessions-websocket");
			stompClient = over(socket);
			stompClient.connect({}, onConnected, onError);
		}
	}, [questions]);
	const onConnected = () => {
		stompClient.subscribe("/sessions/" + sessionCode, onReceived);
	};
	const onReceived = (payload) => {
		const newQuestion = JSON.parse(payload.body);
		questions.push(newQuestion);
		setQuestions([...questions]);
	};
	const onError = (err) => {
		console.log(err);
	};
	const sendQuestion = (question) => {
		stompClient.send("/questions", {}, JSON.stringify(question));
	};
	return (
		<div
			className="row p-3"
			style={{
				minHeight: "100vh",
			}}
		>
			<div className="col-lg-4"></div>
			<div className="col-lg-4 pt-5 mt-5">
				<div className="display-4">Welcome to session "{sessionCode}"!</div>
				<hr></hr>
				<p className="lead">You have just joined session "{sessionCode}".</p>
				<AddForm sendQuestion={sendQuestion} sessionCode={sessionCode} />
				<button
					className="btn btn-primary mt-3 shadow"
					onClick={() => {
						setRefresh(true);
					}}
				>
					Refresh
				</button>
				<Questions
					questions={questions}
					setQuestions={setQuestions}
					userType="participant"
				/>
			</div>
			<div className="col-lg-4"></div>
		</div>
	);
};

export default Participant;
