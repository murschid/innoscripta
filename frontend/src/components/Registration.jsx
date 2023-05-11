import { Col, Row, Container, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function Registration() {
	return (
		<Container className="minHeight">
			<Row className="mt-5 d-flex justify-content-center align-items-center">
				<Col md={8} lg={6} xs={12}>
					<Card className="shadow">
						<Card.Body>
							<h3 className="fw-bold mb-3 text-center">User Registration</h3>
							<RegisterForm />
							<div className="mt-3">
								<p className="mb-0  text-center">
									{`Already have an account? `}
									<NavLink to={"/login"} className={"text-primary fw-bold"}>
										Login
									</NavLink>
								</p>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Registration;
