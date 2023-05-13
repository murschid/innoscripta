import { Navbar, Container } from "react-bootstrap";

const Footer = () => {
	return (
		<Navbar fixed="bottom" bg="light" variant="light" className="mt-2 py-3">
			<Container className="text-center d-block">
				<span className="text-muted">© 2023 Example Inc. All Rights Reserved</span>
			</Container>
		</Navbar>
	);
};
export default Footer;
