import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { userLogin, errorMessage } = useAuth();

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			await userLogin(email, password);
			<Navigate to={"/"} />;
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<Form onSubmit={handleSubmit}>
			{errorMessage && <Alert variant="danger">{errorMessage.email}</Alert>}
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label className="text-center">
					Email <span className="text-danger">*</span>
				</Form.Label>
				<Form.Control type="email" placeholder="Enter Email" required min={9} onChange={(event) => setEmail(event.target.value)} />
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>
					Password <span className="text-danger">*</span>
				</Form.Label>
				<Form.Control type="password" placeholder="Enter Password" required min={6} onChange={(event) => setPassword(event.target.value)} />
			</Form.Group>
			<Button variant="outline-primary" type="submit">
				Login
			</Button>
		</Form>
	);
};

export default LoginForm;
