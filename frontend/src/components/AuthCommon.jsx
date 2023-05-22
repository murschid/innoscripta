import { Col, Container, Image, Row } from "react-bootstrap";

const AuthCommon = ({ children }) => {
	const images = Math.ceil(Math.random() * 6);
	return (
		<Container>
			<Row className="mt-5">
				<Col md={6}>
					<Image src={"bg" + images + ".svg"} alt="bg" className="img-fluid" />
				</Col>
				<Col md={6} className="container">
					<Row className="justify-content-center">{children}</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default AuthCommon;
