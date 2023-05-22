import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Home from "./Home";
import Menubar from "./Menubar";
import AuthProvider from "../contexts/AuthContext";
import UserDashboard from "./UserDashboard";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import ForgotPasswordForm from "./ForgotPasswordForm";
import AuthCommon from "./AuthCommon";
import ResetPasswordForm from "./ResetPasswordForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

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
						<Route path="login" element={<AuthCommon children={<LoginForm />} />} />
						<Route path="register" element={<AuthCommon children={<RegisterForm />} />} />
						<Route path="forgot-password" element={<AuthCommon children={<ForgotPasswordForm />} />} />
						<Route path="reset-password" element={<AuthCommon children={<ResetPasswordForm />} />} />
					</Route>
				</Routes>
				<Footer />
			</AuthProvider>
		</div>
	);
}

export default App;
