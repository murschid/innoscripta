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

	//user registration function
	const userRegister = async (name, email, password, confirmPassword, agreement) => {
		const registerData = { name, email, password, password_confirmation: confirmPassword, agreement };
		try {
			setLoading(true);
			const response = await axios.post("http://127.0.0.1:8000/api/register", registerData);
			if (response.data.status === 200) {
				setCurrentUser(response.data);
				localStorage.setItem("userLoginData", JSON.stringify(response.data));
			} else {
				console.log(response);
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
			setLoading(true);
			const response = await axios.post("http://127.0.0.1:8000/api/login", loginData);
			if (response.data.status === 200) {
				setCurrentUser(response.data);
				localStorage.setItem("userLoginData", JSON.stringify(response.data));
			} else {
				setErrorMessage(response.data.vError);
			}
		} catch (error) {
			console.error(error);
		}
		setLoading(false);
	};

	//user logout function
	const userLogout = () => {
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

	return <AuthContext.Provider value={userData}>{!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;
