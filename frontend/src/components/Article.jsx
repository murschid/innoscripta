import { Nav, Card, Col, Row } from "react-bootstrap";

const Article = ({ articles }) => {
	return (
		<Col md={10}>
			<Row xs={1} md={3} className="g-4">
				{articles.map((article) => {
					return (
						<Col key={article.id} className="d-flex flex-row flex-wrap">
							<Card>
								<Card.Img variant="bottom" height={200} src={article.url_to_image || "https://placehold.co/1280x750"} />
								<Card.Body>
									<Card.Title>{article.title}</Card.Title>
									<Card.Subtitle className="my-2 text-muted">
										<p className="my-0">
											<small>Author: {article.author.split(",")[0]}</small>
										</p>
										<p className="my-1">
											<small>Published: {new Date(article.published_at).toDateString()}</small>
										</p>
										<p className="my-0">
											<small>Category: {article.category}</small>
										</p>
									</Card.Subtitle>
									<Card.Text>
										{article.description.substr(0, 100)}
										<strong> ...more</strong>
									</Card.Text>
									<Nav.Link href={article.url} target="_blank">
										Click to read full news from-<strong>{` ${article.source_name}`}</strong>
									</Nav.Link>
								</Card.Body>
							</Card>
						</Col>
					);
				})}
			</Row>
		</Col>
	);
};

export default Article;
