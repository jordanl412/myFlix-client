import React from 'react';
import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";

// BookCard function component
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.author}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Read More
                </Button>
            </Card.Body>
        </Card>
    );
};
    

/*
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );
};
*/

// Defines all the props constraints for MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
