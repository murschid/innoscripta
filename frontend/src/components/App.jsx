import Footer from "./Footer";
import Home from "./Home";
import Menubar from "./Menubar";
import Login from "./Login";
import Registration from "./Registration";
import { Routes, Route } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import UserDashboard from "./UserDashboard";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

function App() {
	return (
		<div className="main">
			<AuthProvider>
				<Menubar />
				<Routes>
					<Route path="/*" element={<PrivateRoutes />}>
						<Route path="" element={<Home />} />
						<Route path="dashboard" element={<UserDashboard />} />
					</Route>
					<Route path="/*" element={<PublicRoutes />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Registration />} />
					</Route>
				</Routes>
				<Footer />
			</AuthProvider>
		</div>
	);
}

export default App;
