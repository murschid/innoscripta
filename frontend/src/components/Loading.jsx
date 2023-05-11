import { Spinner } from "react-bootstrap";

const Loading = () => {
	return (
		<div className="text-center spinner">
			<Spinner animation="border" role="status">
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	);
};

export default Loading;
