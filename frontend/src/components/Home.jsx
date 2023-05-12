import { Dropdown, InputGroup, Row, FormControl, DropdownButton, Container, Button } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import useArticleList from "../hooks/useArticleList";
import Article from "./Article";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

function Home() {
	const { currentUser, loginStorageData } = useAuth();
	const [searchValue, setSearchValue] = useState("");
	const [orderBy, setOrderBy] = useState("");
	const [selectedSources, setSelectedSources] = useState([]);
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [pageNo, setPageNo] = useState(1);
	const [articlesShow, setArticlesShow] = useState([]);

	const api = `http://127.0.0.1:8000/api/articles?s=${searchValue}&sort=${orderBy}&date=${selectedDate}&category=${selectedCategory}&source=${selectedSources}&page=${pageNo}&user=${loginStorageData.user.id}`;

	const { articles, lastPage, loading } = useArticleList(api);

	useEffect(() => {
		setArticlesShow(articles);
	}, [articles]);

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handleOptionSelect = (eventKey) => {
		setOrderBy(eventKey);
	};

	const handleSources = (value) => {
		setSelectedSources(value);
	};

	const handleDate = (value) => {
		setSelectedDate(value);
	};

	const handleCategory = (value) => {
		setSelectedCategory(value);
	};

	const handlePageNo = () => {
		setPageNo(pageNo + 1);
		setArticlesShow(articles);
	};

	return (
		<Container className="mt-2 minHeight">
			{loading && !searchValue && <Loading />}
			<Row>
				<InputGroup className="my-3">
					<FormControl type="search" placeholder="Search" value={searchValue} onChange={handleSearchChange} />
					<DropdownButton as={InputGroup.Append} variant="outline-secondary" title="Choose Order" onSelect={handleOptionSelect}>
						<Dropdown.Item eventKey="asc">Ascending</Dropdown.Item>
						<Dropdown.Item eventKey="desc">Descending</Dropdown.Item>
					</DropdownButton>
				</InputGroup>
				<Article articles={articlesShow} />
				<Sidebar selectedSources={handleSources} selectedDate={handleDate} selectedCategory={handleCategory} />
			</Row>
			{pageNo !== lastPage && articles.length > 0 && (
				<div className="d-flex justify-content-center mt-4">
					<Button onClick={handlePageNo} variant="primary">
						Load Next
					</Button>
				</div>
			)}
		</Container>
	);
}

export default Home;
