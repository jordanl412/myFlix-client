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
     /*       .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.docs.map((doc) => {
                    return {
                        id: doc._id,
                        title: doc.Title,
                        description: doc.Description,
                        image: doc.ImagePath,
                        director: doc.Director.Name,
                        genre: doc.Genre.Name,
                        featured: doc.Featured
                    };
                });

                setMovies(moviesFromApi);
            });*/
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