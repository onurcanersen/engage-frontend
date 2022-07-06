import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Participant from "./pages/Participant";
import Presenter from "./pages/Presenter";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="participant" element={<Participant />} />
					<Route path="presenter" element={<Presenter />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
