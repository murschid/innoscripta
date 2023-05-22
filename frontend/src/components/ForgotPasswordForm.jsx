import { Form, Button, Alert, Col } from "react-bootstrap";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ForgotPasswordForm = () => {
	const [email, setEmail] = useState("");
	const { forgotPassword, errorMessage, successMessage, loading } = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await forgotPassword(email);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Col md={8}>
			<div className="mb-4">
				<h3>Recover Password</h3>
			</div>
			<Form onSubmit={handleSubmit}>
				{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
				{successMessage && <Alert variant="success">{successMessage}</Alert>}
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label className="text-center">
						Email <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control type="email" placeholder="Enter Email" required min={6} onChange={(event) => setEmail(event.target.value)} />
				</Form.Group>
				<Button variant="outline-primary" type="submit" disabled={loading}>
					Submit
				</Button>
			</Form>
			<p className="mt-3">
				{`Can you remember the password? `}
				<NavLink to={"/login"} className={"text-primary fw-bold text-decoration-none"}>
					Login
				</NavLink>
			</p>
		</Col>
	);
};

export default ForgotPasswordForm;
