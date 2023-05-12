import { useAuth } from "../contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = () => {
	const { loginStorageData } = useAuth();

	return !loginStorageData ? <Outlet /> : <Navigate to={"/"} />;
};

export default PublicRoutes;
