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
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [vError, setVError] = useState("");

	const resetError = () => {
		setErrorMessage("");
		setSuccessMessage("");
		setSuccessMessage("");
	};

	// User registration function
	const userRegister = async (name, email, password, password_confirmation, agreement) => {
		const registerData = { name, email, password, password_confirmation, agreement };
		resetError();
		setLoading(true);
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/register", registerData);
			setCurrentUser(response.data);
			localStorage.setItem("userLoginData", JSON.stringify(response.data));
		} catch (error) {
			if (error.response.status === 422) {
				setVError(error.response.data.errors);
			}
		}
		setLoading(false);
	};

	// User login function
	const userLogin = async (email, password) => {
		const loginData = { email, password };
		resetError();
		setLoading(true);
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/login", loginData);
			if (response.data.status === 200) {
				setCurrentUser(response.data);
				localStorage.setItem("userLoginData", JSON.stringify(response.data));
			} else {
				setErrorMessage(response.data.errors);
			}
		} catch (error) {
			if (error.response.status === 422) {
				setVError(error.response.data.errors);
			}
		}
		setLoading(false);
	};

	// User logout function
	const userLogout = async () => {
		// await new Promise((r) => setTimeout(r, 100));
		resetError();
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/logout", null, {
				headers: { Authorization: `Bearer ${loginStorageData.token}` },
			});
			if (response.data.status === 200) {
				setCurrentUser("");
				localStorage.removeItem("userLoginData");
			}
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	// User password recovery mail sending method
	const forgotPassword = async (email) => {
		resetError();
		setLoading(true);
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/forgotPassword", { email });
			if (response.data.status) {
				setSuccessMessage(response.data.status);
			} else {
				setErrorMessage(response.data.errors.email);
			}
		} catch (error) {
			setErrorMessage(error.response.data.errors);
		}
		setLoading(false);
	};

	// User password reset method
	const resetPassword = async (email, token, password, password_confirmation) => {
		const resetData = { email, token, password, password_confirmation };
		resetError();
		setLoading(true);
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/resetPassword", resetData);
			if (response.data.status) {
				setSuccessMessage(response.data.status);
			} else {
				setErrorMessage("Wrong credentials or something went wrong!");
			}
		} catch (error) {
			setErrorMessage(error.response.data.errors);
		}
		setLoading(false);
	};

	useEffect(() => {
		setLoginStorageData(currentUser || JSON.parse(localStorage.getItem("userLoginData")));
	}, [currentUser]);

	const userData = { currentUser, loginStorageData, userLogin, userRegister, userLogout, forgotPassword, resetPassword, vError, errorMessage, successMessage, loading };

	return <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
