import React from 'react';
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://witty-boa-tights.cyclic.app/movies")
            .then((response) => {
                //const moviesJson = response.json();
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
        }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick=
            {() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    
    return (
        <div>
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
};