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
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.docs.map((doc) => {
                    return {
                        id: doc.key,
                        title: doc.title,
                        description: doc.description,
                        image: doc.imagePath,
                        director: doc.director.name,
                        genre: doc.genre.name,
                        featured: doc.featured
                    };
                });

                setMovies(moviesFromApi);
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