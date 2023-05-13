import { Col, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import useCustomization from "../hooks/useCustomization";

const Sidebar = ({ selectedSources, selectedDate, selectedCategory }) => {
	const { sources, categories } = useCustomization();
	const [selectDate, setSelectDate] = useState("");

	const handleSourceChange = (event) => {
		selectedSources(event);
	};

	const handleDate = (event) => {
		setSelectDate(event.target.value);
		selectedDate(event.target.value);
	};

	const handleCategory = (event) => {
		selectedCategory(event);
	};

	return (
		<Col md={2}>
			<div className="bg-light">
				<div className="px-3 pb-5">
					<Form.Group className="me-3" controlId="formDate">
						<Form.Label className="h5 pt-2">Pick a date</Form.Label>
						<Form.Control type="date" max={new Date().toISOString().split("T")[0]} value={selectDate} onChange={handleDate} />
					</Form.Group>

					<h5 className="pt-3">Categories</h5>
					<DropdownButton as={InputGroup.Append} variant="outline-secondary" title="Choose Author" onSelect={handleCategory}>
						<Dropdown.Item eventKey="">All Categories</Dropdown.Item>
						{categories &&
							categories.map((category, index) => {
								return (
									<Dropdown.Item key={index} eventKey={category.category}>
										{category.category}
									</Dropdown.Item>
								);
							})}
					</DropdownButton>
					<h5 className="pt-3">Main Sources</h5>
					<DropdownButton as={InputGroup.Append} variant="outline-secondary" title="Choose Source" onSelect={handleSourceChange}>
						<Dropdown.Item eventKey="">All Sources</Dropdown.Item>
						{sources &&
							sources.map((source, index) => {
								return (
									<Dropdown.Item key={index} eventKey={source.api}>
										{source.api}
									</Dropdown.Item>
								);
							})}
					</DropdownButton>
				</div>
			</div>
		</Col>
	);
};

export default Sidebar;
