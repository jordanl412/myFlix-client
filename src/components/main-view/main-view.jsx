import React from 'react';
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { FilterMovies } from "../filter-movies/filter-movies";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./main-view.scss";

export const MainView = () => {
    //const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUser = localStorage.getItem("user") ? 
    JSON.parse(localStorage.getItem("user")) : null;
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://witty-boa-tights.cyclic.app/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data) {
                    console.log(data);
                    const moviesFromApi = data.map((movie) => {
                        return {
                            id: movie._id,
                            title: movie.Title,
                            description: movie.Description,
                            image: movie.ImagePath,
                            director: movie.Director.Name,
                            genre: movie.Genre.Name,
                            featured: movie.Featured
                        };
                });

                console.log(moviesFromApi)
                setMovies(moviesFromApi);
                }
             });
        }, [token]);

        return (
            <BrowserRouter>
                <NavigationBar
                    user={user}
                    onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                    }}
                />
            <Row>
                <FilterMovies />
            </Row>
            <Row className="justify-content-md-center"> 
              <Routes>
                <Route
                    path="/signup"
                    element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <SignupView />
                                </Col>
                            )}
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            {user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <LoginView onLoggedIn={(user) => setUser(user)} />
                                </Col>
                            )}
                        </>
                    }
                />
                <Route
                    path="/movies/:movieId"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <Col md={8}>
                                    <MovieView movies={movies} />
                                </Col>
                            )}
                        </>
                    }
                />
                <Route
                    path="/"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <>
                                    {movies.map((movie) => (
                                        <Col className="mb-4" key={movie.id} md={3}>
                                            <MovieCard movie={movie} />
                                        </Col>
                                    ))}
                                </>
                            )}
                        </>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <>
                            {!user ? (
                               <Navigate to="/login" replace /> 
                            ) : user.length === 0 ? (
                                <Col>No such user found</Col>
                            ) : (
                                <Col>
                                    <ProfileView user={user} movies={movies} />
                                </Col>
                            )}
                        </>
                    }
                />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
