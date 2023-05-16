import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Loading from "./Loading";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(true);
	const { userLogin, errorMessage, loading } = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await userLogin(email, password);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Form onSubmit={handleSubmit}>
			{errorMessage && <Alert variant="danger">{errorMessage.common}</Alert>}
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
			<Form.Check className="mb-3" checked={remember} label="Remember Me" onChange={(event) => setRemember(event.target.value)} />
			<Button variant="outline-primary" type="submit" disabled={loading}>
				Login
			</Button>
		</Form>
	);
};

export default LoginForm;
