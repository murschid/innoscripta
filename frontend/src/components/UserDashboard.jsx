import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import useCustomization from "../hooks/useCustomization";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const UserDashboard = () => {
	const { loginStorageData, userLogout } = useAuth();
	const { sources, authors, categories } = useCustomization();
	const [loading, setLoading] = useState(false);
	const userId = loginStorageData.user.id;

	const [checkSource, setCheckSource] = useState([]);
	const [checkAuthor, setCheckAuthor] = useState([]);
	const [checkCategory, setCheckCategory] = useState([]);

	// this hook method brings all user setting data
	useEffect(() => {
		(async () => {
			setLoading(true);
			try {
				const response = await axios.get(`http://127.0.0.1:8000/api/checkSetting?user=${userId}`);
				setCheckSource(response.data.sources.map((item) => item.name));
				setCheckAuthor(response.data.authors.map((item) => item.name));
				setCheckCategory(response.data.categories.map((item) => item.name));
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		})();
	}, [userId]);

	// this method will update and delete user setting for customized news feed
	const handleCheckbox = async (event) => {
		const checkedVal = event.target.value;
		const nameVal = event.target.name;

		if (checkCategory.includes(checkedVal)) setCheckCategory(checkCategory.filter((item) => item !== checkedVal));
		else setCheckCategory([...checkCategory, checkedVal]);

		if (checkAuthor.includes(checkedVal)) setCheckAuthor(checkAuthor.filter((item) => item !== checkedVal));
		else setCheckAuthor([...checkAuthor, checkedVal]);

		if (checkSource.includes(checkedVal)) setCheckSource(checkSource.filter((item) => item !== checkedVal));
		else setCheckSource([...checkSource, checkedVal]);

		if (event.target.checked) await axios.post("http://127.0.0.1:8000/api/storeSetting", { user_id: userId, name: checkedVal, type: nameVal });
		else await axios.post("http://127.0.0.1:8000/api/deleteSetting", { user_id: userId, name: checkedVal, type: nameVal });
	};

	return (
		<Container className="mt-3">
			{loading && <Loading />}
			<h1>Welcome, {loginStorageData.user.name}!</h1>
			<hr />
			<h5>
				<span>Email: {loginStorageData.user.email}</span>
				<span className="float-end">Account Created: {new Date(loginStorageData.user.created_at).toLocaleDateString()}</span>
			</h5>
			<hr />
			<Row className="mb-3">
				<h2 className="text-center my-3">Customize your news feed from below sections</h2>
				<h4 className="text-center text-danger mb-4">[ If you check any option that means you are not interested to see about that article ]</h4>
				<hr />

				{/* Sources controlling section*/}
				<Col md={2}>
					<h4>Main Sources</h4>
					{sources &&
						sources.map((source, index) => {
							return (
								<div key={index} className="p-1">
									<Form.Check checked={checkSource.includes(source.api)} name="source" label={source.api} value={source.api} onChange={handleCheckbox} />
								</div>
							);
						})}
				</Col>

				{/* Authors controlling section*/}
				<Col md={7}>
					<h4>Authors</h4>
					<div className="d-flex flex-wrap justify-content-center">
						{authors &&
							authors.map((author, index) => {
								return (
									<div key={index} className="flex-fill p-1">
										<Form.Check checked={checkAuthor.includes(author.author)} name="author" label={author.author} value={author.author} onChange={handleCheckbox} />
									</div>
								);
							})}
					</div>
				</Col>

				{/* Categories controlling section*/}
				<Col md={3}>
					<h4>Category</h4>
					{categories &&
						categories.map((category, index) => {
							return (
								<div key={index} className="p-1">
									<Form.Check checked={checkCategory.includes(category.category)} name="category" label={category.category} value={category.category} onChange={handleCheckbox} />
								</div>
							);
						})}
				</Col>
				<hr />
				<div className="mb-5">
					<Button className="float-start" onClick={userLogout}>
						Logout
					</Button>
				</div>
			</Row>
		</Container>
	);
};

export default UserDashboard;
