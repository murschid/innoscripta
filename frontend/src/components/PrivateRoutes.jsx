import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
	const { currentUser, loginStorageData } = useAuth();

	return loginStorageData ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
