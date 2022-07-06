import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PresenterDataService from "../services/PresenterService";
import SessionDataService from "../services/SessionService";
import QuestionDataService from "../services/QuestionService";
import Questions from "../components/Questions";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null;

const Presenter = () => {
	const location = useLocation();
	const { presenterEmail } = location.state;
	const [presenter, setPresenter] = useState("");
	const [sessions, setSessions] = useState([]);
	const [currentSession, setCurrentSession] = useState("");
	const [questions, setQuestions] = useState([]);
	const [refresh, setRefresh] = useState(false);
	useEffect(() => {
		PresenterDataService.findByEmail(presenterEmail)
			.then((response) => {
				if (response.data) {
					setPresenter(response.data);
				} else {
					const newPresenter = {
						email: presenterEmail,
					};
					PresenterDataService.create(newPresenter)
						.then((response) => {
							setPresenter(response.data);
						})
						.catch((e) => {
							console.log(e);
						});
				}
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);
	useEffect(() => {
		if (presenter) {
			SessionDataService.findByPresenterId(presenter.id)
				.then((response) => {
					if (response.data.length) {
						setSessions([...response.data]);
						setCurrentSession([...response.data][0]);
					} else {
						SessionDataService.create(presenter.id, {}).then((response) => {
							setSessions([response.data]);
							setCurrentSession(response.data);
						});
					}
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [presenter]);
	useEffect(() => {
		if (currentSession) {
			QuestionDataService.findBySessionCode(currentSession.code)
				.then((response) => {
					setQuestions([...response.data]);
				})
				.catch((e) => {
					console.log(e);
				});
			if (refresh) {
				setRefresh(false);
			}
		}
	}, [currentSession, refresh]);
	useEffect(() => {
		if (questions) {
			const socket = new SockJS("http://localhost:8080/sessions-websocket");
			stompClient = over(socket);
			stompClient.connect({}, onConnected, onError);
		}
	}, [questions]);
	const onConnected = () => {
		stompClient.subscribe("/sessions/" + currentSession.code, onReceived);
	};
	const onReceived = (payload) => {
		const newQuestion = JSON.parse(payload.body);
		questions.push(newQuestion);
		setQuestions([...questions]);
	};
	const onError = (err) => {
		console.log(err);
	};
	const createSession = () => {
		SessionDataService.create(presenter.id, {})
			.then((response) => {
				setSessions([...sessions, response.data]);
			})
			.catch((e) => {
				console.log(e);
			});
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
				<div className="display-4">
					Welcome to session "{currentSession.code}"!
				</div>
				<hr></hr>
				<p className="lead">
					You have just joined session "{currentSession.code}" presenter "
					{presenter.email}".
				</p>
				<p className="lead">Select another session to join:</p>
				<ul className="list-group rounded shadow">
					{sessions.map((session, index) => (
						<li
							className={
								currentSession.code === session.code
									? "list-group-item active"
									: "list-group-item"
							}
							onClick={() => {
								setCurrentSession(session);
							}}
							style={{ cursor: "pointer" }}
							key={index}
						>
							Session "{session.code}"
						</li>
					))}
				</ul>
				<button className="btn btn-primary mt-3 shadow" onClick={createSession}>
					Create Session
				</button>
				<button
					className="btn btn-primary mt-3 ms-2 shadow"
					onClick={() => {
						setRefresh(true);
					}}
				>
					Refresh
				</button>
				<div>
					<Questions
						questions={questions}
						setQuestions={setQuestions}
						userType="presenter"
					/>
				</div>
			</div>
			<div className="col-lg-4"></div>
		</div>
	);
};

export default Presenter;
