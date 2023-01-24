import React from "react";
import { useState } from "react";
import { Col, Container, Dropdown, ListGroup, Row } from "react-bootstrap";

export const FilterMovies = ({movies}) => {
    const filterMenuOptions = {
        Genre: ["Action", "Drama", "Dystopian", "Musical Drama", 
        "Romantic Comedy", "Romantic Drama", "Science Fiction"]
    };

    const [selectedFilterOption, setSelectedFilterOption] = useState(
        Object.keys(filterMenuOptions)[0]
    );

    const onGenreChange() => {
        let selectedGenre = selectedFilterOption
        let filteredMovies = movies.filter(movie => movie.genre === selectedGenre)
    };
    
    return (
        <Dropdown>
            <Dropdown.Toggle className="menu-dropdown button-primary">
                Filter By:
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Container>
                    <Row style={{ minWidth: "50vw" }}>
                        <Col>
                            <ListGroup variant="flush">
                                {Object.keys(filterMenuOptions).map((fKey, id) => (
                                    <ListGroup.Item
                                        key={id}
                                        action
                                        active={selectedFilterOption === fKey}
                                        onClick={() => setSelectedFilterOption(fKey)}
                                        variant="success"
                                    >
                                        {fKey}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col>
                            <ListGroup>
                                {filterMenuOptions[selectedFilterOption].map((option, id) => (
                                    <Row key={id}>
                                        <Col xs="2">
                                            <input type="checkbox" />
                                        </Col>
                                        <Col>
                                            <p>{option}</p>
                                        </Col>
                                    </Row>
                                ))}
                            </ListGroup>
                        </Col>
                    </Row>
                </Container>
            </Dropdown.Menu>
        </Dropdown>
    );
};


                /*<Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Drama</Dropdown.Item>
                <Dropdown.Item>Dystopian</Dropdown.Item>
                <Dropdown.Item>Musical Drama</Dropdown.Item>
                <Dropdown.Item>Romantic Comedy</Dropdown.Item>
                <Dropdown.Item>Romantic Drama</Dropdown.Item>
                <Dropdown.Item>Science Fiction</Dropdown.Item>*/