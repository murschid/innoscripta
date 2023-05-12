import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
	const { loginStorageData } = useAuth();

	return loginStorageData ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
