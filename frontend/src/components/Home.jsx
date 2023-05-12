import { Dropdown, InputGroup, Row, FormControl, DropdownButton, Container, Button, ButtonGroup } from "react-bootstrap";
import { ArrowLeftSquareFill, ArrowRightSquareFill } from "react-bootstrap-icons";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import useArticleList from "../hooks/useArticleList";
import Article from "./Article";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

function Home() {
	const { loginStorageData } = useAuth();
	const [searchValue, setSearchValue] = useState("");
	const [orderBy, setOrderBy] = useState("");
	const [selectedSources, setSelectedSources] = useState([]);
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [articlesShow, setArticlesShow] = useState([]);

	const api = `http://127.0.0.1:8000/api/articles?s=${searchValue}&sort=${orderBy}&date=${selectedDate}&category=${selectedCategory}&source=${selectedSources}&page=${pageNo}&user=${loginStorageData.user.id}`;

	const { articles, lastPage, loading } = useArticleList(api);

	useEffect(() => {
		setArticlesShow(articles);
	}, [articles]);

	const handleSources = (value) => {
		setSelectedSources(value);
	};

	const handleDate = (value) => {
		setSelectedDate(value);
	};

	const handleCategory = (value) => {
		setSelectedCategory(value);
	};

	const handlePageNo = (event) => {
		event.target.name === "next" ? setPageNo(pageNo + 1) : setPageNo(pageNo - 1);
		setArticlesShow(articles);
	};

	return (
		<Container className="mt-2 minHeight">
			{loading && !searchValue && <Loading />}
			<Row>
				<InputGroup className="my-3">
					<FormControl type="search" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
					<DropdownButton as={InputGroup.Append} variant="outline-secondary" title="Choose Order" onSelect={(eventKey) => setOrderBy(eventKey)}>
						<Dropdown.Item eventKey="asc">Ascending</Dropdown.Item>
						<Dropdown.Item eventKey="desc">Descending</Dropdown.Item>
					</DropdownButton>
				</InputGroup>
				<Article articles={articlesShow} />
				<Sidebar selectedSources={handleSources} selectedDate={handleDate} selectedCategory={handleCategory} />
			</Row>

			{articles.length > 0 && (
				<div className="d-flex justify-content-center mt-4">
					<ButtonGroup>
						<Button disabled={pageNo <= 1} onClick={handlePageNo} name="previous" variant="primary" className="me-2">
							<ArrowLeftSquareFill className="me-2" />
							Prev
						</Button>
						<Button disabled={pageNo >= lastPage} onClick={handlePageNo} name="next" variant="primary">
							Next
							<ArrowRightSquareFill className="ms-2" />
						</Button>
					</ButtonGroup>
				</div>
			)}
		</Container>
	);
}

export default Home;
