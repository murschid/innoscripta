import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const RegisterForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [agreement, setAgreement] = useState(false);
	const [loading, setLoading] = useState(false);
	const { userRegister, errorMessage } = useAuth();

	async function handleSubmit(event) {
		console.log(agreement);
		event.preventDefault();
		try {
			await userRegister(name, email, password, confirmPassword, agreement);
			<Navigate to={"/"} />;
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formBasicName">
				<Form.Label className="text-center">
					Full Name <span className="text-danger">*</span>
				</Form.Label>
				<Form.Control type="text" placeholder="Enter name" required min={3} value={name} onChange={(event) => setName(event.target.value)} />
				{errorMessage && <p className="text-danger">{errorMessage.name}</p>}
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label className="text-center">
					Email <span className="text-danger">*</span>
				</Form.Label>
				<Form.Control type="email" placeholder="Enter email" required min={9} value={email} onChange={(event) => setEmail(event.target.value)} />
				{errorMessage && <p className="text-danger">{errorMessage.email}</p>}
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>
					Password <span className="text-danger">*</span>
				</Form.Label>
				<Form.Control type="password" placeholder="Enter Password" required min={6} value={password} onChange={(event) => setPassword(event.target.value)} />
				{errorMessage && <p className="text-danger">{errorMessage.password_confirmation}</p>}
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicConfirmPassword">
				<Form.Label>
					Confirm Password <span className="text-danger">*</span>
				</Form.Label>
				<Form.Control type="password" placeholder="Confirm Password" required min={6} onChange={(event) => setConfirmPassword(event.target.value)} />
				{errorMessage && <p className="text-danger">{errorMessage.password}</p>}
			</Form.Group>
			<Form.Check className="mb-3" label="I agree to the Terms and Conditions *" onChange={(event) => setAgreement(event.target.value)} />
			{errorMessage && <p className="text-danger">{errorMessage.agreement}</p>}
			<Button variant="outline-primary" type="submit">
				Register
			</Button>
		</Form>
	);
};
//disabled={loading}
export default RegisterForm;
