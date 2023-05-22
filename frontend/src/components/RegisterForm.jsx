import { Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const RegisterForm = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password_confirmation, setConfirmPassword] = useState("");
	const [agreement, setAgreement] = useState(true);
	const [error, setError] = useState();
	const { userRegister, vError, loading } = useAuth();

	async function handleSubmit(event) {
		event.preventDefault();
		if (password !== password_confirmation) return setError("Password didn't match");
		try {
			await userRegister(name, email, password, password_confirmation, agreement);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Col md={8}>
			<div className="mb-4">
				<h3>User Registration</h3>
			</div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="formBasicName">
					<Form.Label className="text-center">
						Full Name <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control type="text" name="name" placeholder="Enter Name" required min={1} value={name} onChange={(event) => setName(event.target.value)} />
					{vError && <p className="text-danger">{vError.name}</p>}
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label className="text-center">
						Email <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control type="email" name="email" placeholder="Enter Email" required min={9} value={email} onChange={(event) => setEmail(event.target.value)} />
					{vError && <p className="text-danger">{vError.email}</p>}
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>
						Password <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control type="password" name="password" placeholder="Enter Password" required min={6} value={password} onChange={(event) => setPassword(event.target.value)} />
					{vError && <p className="text-danger">{vError.password}</p>}
					{error && <p className="text-danger">{error}</p>}
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicConfirmPassword">
					<Form.Label>
						Confirm Password <span className="text-danger">*</span>
					</Form.Label>
					<Form.Control type="password" name="password_confirmation" placeholder="Confirm Password" required min={6} onChange={(event) => setConfirmPassword(event.target.value)} />
					{vError && <p className="text-danger">{vError.password_confirmation}</p>}
				</Form.Group>
				<Form.Check className="mb-3" checked={agreement} name="agreement" label="I agree to the Terms and Conditions *" onChange={(event) => setAgreement(event.target.checked)} />
				{vError && <p className="text-danger">{vError.agreement}</p>}
				<Button variant="outline-primary" type="submit" disabled={loading}>
					Register
				</Button>
			</Form>
			<p className="mt-3">
				{`Already have an account? `}
				<NavLink to={"/login"} className={"text-primary fw-bold text-decoration-none"}>
					Login
				</NavLink>
			</p>
		</Col>
	);
};

export default RegisterForm;
