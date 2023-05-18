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
	const [orderBy, setOrderBy] = useState("desc");
	const [selectedDate, setSelectedDate] = useState("");
	const [selectedSources, setSelectedSources] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [articlesShow, setArticlesShow] = useState([]);
	const userId = loginStorageData.user.id;

	const api = `http://127.0.0.1:8000/api/articles?s=${searchValue}&sort=${orderBy}&date=${selectedDate}&category=${selectedCategory}&source=${selectedSources}&page=${pageNo}&user=${userId}`;

	const { articles, lastPage, loading } = useArticleList(api);

	useEffect(() => {
		setArticlesShow([...articles]);
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

	const handlePagination = (event) => {
		const status = event.target.id;
		if (status === "next") {
			setPageNo(pageNo + 1);
		} else if (status === "prev") {
			setPageNo(pageNo - 1);
		} else if (status === "last") {
			setPageNo(lastPage);
		} else if (status === "first") {
			setPageNo(1);
		} else {
			setPageNo(pageNo);
		}
	};

	return (
		<Container className="mt-2 minHeight">
			{loading && !searchValue && <Loading />}
			<Row>
				<InputGroup className="my-3">
					<FormControl type="search" placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="bg-light" />
					<DropdownButton as={InputGroup.Append} variant="outline-secondary" title="Choose Order" onSelect={(eventKey) => setOrderBy(eventKey)}>
						<Dropdown.Item eventKey="asc">Ascending</Dropdown.Item>
						<Dropdown.Item eventKey="desc">Descending</Dropdown.Item>
					</DropdownButton>
				</InputGroup>
				<Article articles={articlesShow} />
				<Sidebar selectedSources={handleSources} selectedDate={handleDate} selectedCategory={handleCategory} />
			</Row>

			{/* Funny custom pagination */}
			{articles.length > 0 && (
				<div className="d-flex justify-content-center mt-4 cmb-5">
					<ButtonGroup>
						<Button disabled={pageNo <= 1} id="prev" onClick={handlePagination} variant="primary" className="me-2">
							<ArrowLeftSquareFill /> {` Prev`}
						</Button>
						{pageNo > 1 && (
							<Button id="first" onClick={handlePagination} variant="primary" className="me-2">
								1
							</Button>
						)}
						{pageNo < lastPage && (
							<Button id="last" onClick={handlePagination} variant="primary" className="me-2">
								{lastPage}
							</Button>
						)}
						<Button disabled={pageNo >= lastPage} id="next" onClick={handlePagination} variant="primary">
							{`Next `} <ArrowRightSquareFill />
						</Button>
					</ButtonGroup>
				</div>
			)}
		</Container>
	);
}

export default Home;
