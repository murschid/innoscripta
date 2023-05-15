import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

// This context API is for user authentication
const AuthContext = React.createContext(null);

export const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState();
	const [loginStorageData, setLoginStorageData] = useState("");
	const [errorMessage, setErrorMessage] = useState();

	// User registration function
	const userRegister = async (name, email, password, confirmPassword, agreement) => {
		const registerData = { name, email, password, password_confirmation: confirmPassword, agreement };
		setLoading(true);
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/register", registerData);
			if (response.data.status === 200) {
				setCurrentUser(response.data);
				localStorage.setItem("userLoginData", JSON.stringify(response.data));
				setLoading(false);
			} else {
				console.log(response);
				setErrorMessage(response.data.vError);
				setLoading(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// User login function
	const userLogin = async (email, password) => {
		const loginData = { email, password };
		setLoading(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			const response = await axios.post("http://127.0.0.1:8000/api/login", loginData);
			await new Promise((r) => setTimeout(r, 1000));
			if (response.data.status === 200) {
				setCurrentUser(response.data);
				localStorage.setItem("userLoginData", JSON.stringify(response.data));
			} else {
				setErrorMessage(response.data.lError);
			}
		} catch (error) {
			console.error(error);
		}
		setLoading(false);
	};

	// User logout function
	const userLogout = async () => {
		setLoading(true);
		// await new Promise((r) => setTimeout(r, 100));
		setCurrentUser("");
		localStorage.removeItem("userLoginData");
		setLoading(false);

		// try {
		// 	await axios.post("http://127.0.0.1:8000/api/logout", null, {
		// 		headers: { Authorization: `Bearer ${loginStorageData.token}` },
		// 	});
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	useEffect(() => {
		setLoginStorageData(currentUser || JSON.parse(localStorage.getItem("userLoginData")));
	}, [currentUser]);

	const userData = { currentUser, loginStorageData, userLogin, userRegister, userLogout, errorMessage, loading };

	return <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
