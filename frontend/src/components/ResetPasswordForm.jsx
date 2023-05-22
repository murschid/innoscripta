import { Form, Button, Alert, Col } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const ResetPasswordForm = () => {
	const [email, setEmail] = useState("");
	const [token, setToken] = useState("");
	const [password, setPassword] = useState("");
	const [password_confirmation, setConfirmPassword] = useState("");
	const { resetPassword, errorMessage, successMessage, loading } = useAuth();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		setEmail(searchParams.get("email"));
		setToken(searchParams.get("token"));
	}, [searchParams]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await resetPassword(email, token, password, password_confirmation);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Col md={8}>
			<div className="mb-4">
				<h3>Reset Password</h3>
			</div>
			<Form onSubmit={handleSubmit}>
				{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
				{successMessage && <Alert variant="success">{successMessage}</Alert>}
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label className="text-center">
						Password <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control type="password" placeholder="Enter Password" required min={6} onChange={(event) => setPassword(event.target.value)} />
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicConfirmPassword">
					<Form.Label className="text-center">
						Confirm Password <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control type="password" placeholder="Confirm Password" required min={6} onChange={(event) => setConfirmPassword(event.target.value)} />
				</Form.Group>
				<Button variant="outline-primary" type="submit" disabled={loading}>
					Submit
				</Button>
			</Form>
		</Col>
	);
};

export default ResetPasswordForm;
