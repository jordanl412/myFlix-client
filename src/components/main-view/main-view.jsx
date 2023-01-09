import React from 'react';
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./main-view.scss";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
            <Row className="justify-content-md-center"> 
              {!user ? (
                <Col md={5}>
                    <LoginView 
                        onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
              ) : selectedMovie ? (
                <Col md={8} style={{border: "1px solid black"}}>
                    <button className="logout-button"
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}      
                    >
                        Logout
                    </button>
                    <MovieView 
                        style={{border: "1px solid green"}}
                        movie={selectedMovie} 
                        onBackClick={() => setSelectedMovie(null)} 
                    />
                </Col>
              ) : movies.length === 0 ? (
                <Col>
                    <button className="logout-button"
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </button>
                    <div>The list is empty!</div>
                </Col>
              ) : (
                <>
                  {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard
                          movie={movie}
                          onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                          }}
                        />
                      </Col>
                      
                    ))}
                    <Col>
                        <button className="logout-button"
                            onClick={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                            }}
                        >
                            Logout
                        </button>
                    </Col>

                  </>
                )}
              </Row>
          );
        };

/*
    if (!user) {
        return (
            <>
            <LoginView 
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            />
            or
            <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return (
            <>
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                Logout
            </button>
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
            </>
        );
    }

    if (movies.length === 0) {
        return (
            <>
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>
                <div>The list is empty!</div>;
            </>
        );
    }
    
    return (
        <div>
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                Logout
            </button>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};*/