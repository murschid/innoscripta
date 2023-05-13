import { Col, Row, Container, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function Registration() {
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
								<h3>User Registration</h3>
							</div>
							<RegisterForm />
							<p className="mt-3">
								{`Already have an account? `}
								<NavLink to={"/login"} className={"text-primary fw-bold"}>
									Login
								</NavLink>
							</p>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

export default Registration;
