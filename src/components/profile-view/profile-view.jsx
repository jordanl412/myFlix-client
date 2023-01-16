import React from "react";
import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser ? storedUser : null);

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));


    const updateUser = (username) => {
        return fetch("https://witty-boa-tights.cyclic.app/users/" + username, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((user) => {
                if(user) {
                    setUser(user);
                    localStorage.setItem("user", JSON.stringify(user));
                    window.location.reload();
                }
                return username;
            })
            .catch((error) => {
                console.error('Error: ', error);
                return error;
            });
    };

    console.log(updateUser("jordanlazan1"));
    console.log(user.Username);
    console.log(user);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://witty-boa-tights.cyclic.app/users/" + user.Username, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        //.then((response) => response.json())
        .then((response) => {
            alert("Changes saved");
            updateUser(user.Username);
            console.log("Success: ", data);
        })
        .catch((error) => {
            alert("Something went wrong");
            console.log("Error: ", error);
        });
    };

    const handleDeregister = () => {
        fetch("https://witty-boa-tights.cyclic.app/users/" + user.Username, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }).then((response) => {
            if (response.ok) {
                alert("Account successfully deleted");
                window.location.reload();
            } else {
                alert("Something went wrong");
            }
        });
    };

    //console.log(favoriteMovies);
    console.log(user.FavoriteMovies);

    return (
        <Row>
            <Col>
                <div className="profile-info">
                    <div className="user-info">
                        <span className="label">
                            Username:  
                        </span>
                        <span className="value">
                            {user.Username}
                        </span>
                    </div>
                    <div className="user-info">
                        <span className="label">
                            Email: 
                        </span>
                        <span className="value">
                            {user.Email}
                        </span>
                    </div>
                    <div className="user-info">
                        <span className="label">
                            Birthday: 
                        </span>
                        <span className="value">
                            {user.Birthday}
                        </span>
                    </div>
                    <div className="user-info">
                        <span className="label">
                            Favorite Movies:
                        </span>
                        <span className="value">
                            {user.FavoriteMovies}
                        </span>
                    </div>
                </div>
            </Col>
            <Col>
                <Form onSubmit={handleSubmit}>
                    <h2>Update Profile</h2>
                    <Form.Group>
                        <Form.Label>
                            Username: 
                        </Form.Label>
                        <Form.Control
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Password: 
                        </Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Email: 
                        </Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Birthday: 
                        </Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        className="button-primary"
                    >
                        Save Changes
                    </Button>
                </Form>
                <Button
                    onClick={() => handleDeregister(user.id)}
                    className="button-delete"
                    type="submit"
                    variant="danger"
                >
                    Delete Account
                </Button>
            </Col>
            <Row>
                {favoriteMovies.length > 0 &&
                    favoriteMovies.map((movie) => (
                        <Col className="mb-5" key={movie.id} sm={5} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
            </Row>
        </Row>
    );

};
