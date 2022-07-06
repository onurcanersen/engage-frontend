import { useState } from "react";
import { Link } from "react-router-dom";
import participantIcon from "../participant.svg";
import presenterIcon from "../presenter.svg";

const Login = () => {
	const [sessionCode, setSessionCode] = useState("");
	const [presenterEmail, setPresenterEmail] = useState("");
	return (
		<div
			className="row bg-2"
			style={{
				minHeight: "100vh",
				paddingTop: "100px",
				paddingBottom: "100px",
			}}
		>
			<div className="col">
				<div className="row p-5">
					<div className="col-lg-3"></div>
					<div className="col-lg-6 bg-light rounded shadow">
						<div className="row pt-5 pb-5">
							<h1 className="text-center mb-3">Welcome to Engage!</h1>
							<p className="lead text-center">Start engaging.</p>
							<div className="col-lg-6 text-center pt-3 pb-3">
								<p className="lead">I'm a participant</p>
								<img className="w-50" src={participantIcon} alt="Participant" />
								<div className="input-group mx-auto w-75">
									<input
										type="text"
										className="form-control"
										placeholder="Enter code"
										onChange={(e) => setSessionCode(e.target.value)}
									/>
									<button className="btn btn-primary">
										<Link
											to="/participant"
											state={{ sessionCode: sessionCode }}
											style={{ textDecoration: "none", color: "white" }}
										>
											Ask!
										</Link>
									</button>
								</div>
							</div>
							<div className="col-lg-6 text-center pt-3 pb-3">
								<p className="lead">I'm a presenter</p>
								<img className="w-50" src={presenterIcon} alt="Presenter" />
								<div className="input-group mx-auto w-75">
									<input
										type="text"
										className="form-control"
										placeholder="Enter email"
										onChange={(e) => setPresenterEmail(e.target.value)}
									/>
									<button className="btn btn-primary">
										<Link
											to="/presenter"
											state={{ presenterEmail: presenterEmail }}
											style={{ textDecoration: "none", color: "white" }}
										>
											Answer!
										</Link>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-3"></div>
				</div>
			</div>
		</div>
	);
};

export default Login;
