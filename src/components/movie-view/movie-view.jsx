import React from 'react';
import { useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./movie-view.scss";
import { Button, Row, Col } from 'react-bootstrap';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    //console.log(storedUser);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    //const favoriteMovies = [];

    const addFavorite = () => {

        fetch("https://witty-boa-tights.cyclic.app/users/" + user.Username + "/movies/" + movie.id, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            alert("Added to favorites");
            return response.json();
        }).then(data => updateUser(data))
        .catch(error => {
            alert("Something went wrong");
            console.log("Error: ", error);
            return error;
        });
    };

    const removeFavorite = () => {
        fetch("https://witty-boa-tights.cyclic.app/users/" + user.Username + "/movies/" + movie.id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Removed from favorites");
                //return updateUser(user);
                const newUser = {
                    ...user,
                    FavoriteMovies: user.FavoriteMovies.filter(movie => movie._id != movie._id)
                }
                return updateUser(newUser);
            } else {
            alert("Something went wrong");
            console.log("Error: ", error);
            return error;
            }
        });

/*
            alert("Removed from favorites");
            return response.json();
        }).then((data) => {
            return updateUser(data);
        }).catch((error) => {
            alert("Something went wrong");
            console.log("Error: ", error);
            return error;
        });*/
    };

    //console.log(favoriteMovies);
    //console.log(FavoriteMovies);

    const updateUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }

    return (
        <Row className="movie-view">
            <Col md={6} className="movie-poster">
                <img className="w-100" src={movie.image} alt="Movie Poster" />
            </Col>
            <Col md={6}>
                <div>
                    <span>Title: </span>
                    <span>{movie.title}</span>
                </div>
                <div>
                    <span>Description: </span>
                    <span>{movie.description}</span>
                </div>
                <div>
                    <span>Genre: </span>
                    <span>{movie.genre}</span>
                </div>
                <div>
                    <span>Director: </span>
                    <span>{movie.director}</span>
                </div>
                <Link to={`/`}>
                    <button
                        className="back-button"
                        style={{cursor: "pointer"}}
                    >
                        Back
                    </button>
                </Link>
                {
                    storedUser.FavoriteMovies.indexOf(movie.id) >= 0 ? (
                        <Button
                            variant="danger"
                            onClick={() => removeFavorite(movie.id, "add")}
                        >
                            Remove from Favorites
                        </Button>
                    ) : (
                        <Button
                            className="button-add-favorite"
                            onClick={() => addFavorite(movie.id, "add")}
                        >
                            Add to Favorites
                        </Button>
                    )
                }
            </Col>
        </Row>
    );
};




    /*return (
        <div>
            <div>
                <img className="w-100" src={movie.image} alt="Movie Poster"/>
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <Link to={`/`}>
                <button
                    className="back-button"
                    style={{cursor: "pointer"}}
                >
                    Back
                </button>
            </Link>
        </div>
    );
};
*/
