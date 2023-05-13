import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
	return (
		<Container className="minHeight">
			<Row className="mt-5">
				<Col md={6}>
					<Image src="bg.svg" alt="bg" className="img-fluid" />
				</Col>
				<Col md={6} className="container">
					<Row className="justify-content-center">
						<Col md={8}>
							<div className="mb-4">
								<h3>User Login</h3>
							</div>
							<LoginForm />
							<p className="mt-3">
								{`Don't have an account? `}
								<NavLink to={"/register"} className={"text-primary fw-bold"}>
									Register
								</NavLink>
							</p>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
