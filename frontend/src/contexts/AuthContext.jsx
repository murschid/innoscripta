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
	// const [loginError, setLoginError] = useState();

	// const loginStorageData = JSON.parse(localStorage.getItem("loginData"));

	//user registration function
	const userRegister = async (name, email, password, confirmPassword, agreement) => {
		const registerData = { name, email, password, password_confirmation: confirmPassword, agreement };
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/register", registerData);
			if (response.data.status === 200) {
				setCurrentUser(response.data);
				localStorage.setItem("loginData", JSON.stringify(response.data));
				setLoginStorageData(JSON.parse(localStorage.getItem("loginData")));
			} else {
				setErrorMessage(response.data.vError);
			}
		} catch (error) {
			console.error(error);
		}
		setLoading(false);
	};

	//user login function
	const userLogin = async (email, password) => {
		const loginData = { email, password };
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/login", loginData);
			if (response.data.status === 200) {
				setCurrentUser(response.data);
				localStorage.setItem("loginData", JSON.stringify(response.data));
				setLoginStorageData(JSON.parse(localStorage.getItem("loginData")));
			} else {
				setErrorMessage(response.data.vError);
			}
		} catch (error) {
			console.error(error);
		}
	};

	//user logout function
	const userLogout = async () => {
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/logout", null, {
				headers: { Authorization: `Bearer ${loginStorageData.token}` },
			});
			if (response.data) {
				setCurrentUser("");
				setLoginStorageData("");
				localStorage.removeItem("loginData");
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	useEffect(() => {
		const userStorageData = JSON.parse(localStorage.getItem("loginData"));
		setLoginStorageData(userStorageData);
	}, []);

	const userData = { loginStorageData, currentUser, userLogin, userRegister, userLogout, errorMessage };

	return <AuthContext.Provider value={userData}>{!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;
