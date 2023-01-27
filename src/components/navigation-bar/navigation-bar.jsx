import React from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, handleSearchInput, handleFilterSelection }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    myFlix App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                        {user && (
                            <Form inline className="d-flex">
                                <FormControl
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2 mx-2"
                                    onChange={handleSearchInput}
                                />
                                <FormControl
                                    as="select"
                                    onChange={handleFilterSelection}
                                    className="mx-2"
                                >
                                    <option value="title">Title</option>
                                    <option value="genre">Genre</option>
                                    <option value="director">Director</option>
                                </FormControl>
                            </Form>
                        )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};