import { Col, Row, Container, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";

function Login() {
	return (
		<Container className="minHeight">
			<Row className="mt-5 d-flex justify-content-center align-items-center">
				<Col md={8} lg={5} xs={12}>
					<Card className="shadow">
						<Card.Body>
							<h3 className="text-center fw-bold mb-2">User Login</h3>
							<LoginForm />
							<p className="mb-0 text-center">
								{`Don't have an account? `}
								<NavLink to={"/register"} className={"text-primary fw-bold"}>
									Register
								</NavLink>
							</p>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Login;
