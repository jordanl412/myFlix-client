import React from 'react';
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: 'Interstellar',
        description: 'Set in a dystopian future where humanity is struggling to survive, the film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for mankind.',
        genre: {
            name: 'Science Fiction',
            description: 'Science Fiction is a fictionalized story wherein the setting and plot are centered around technology, time travel, outer space, or scientific principles, with or without the presence of aliens. Story elements are not found in the known universe and explained by scientific means.'
        },
        imageURL: 'https://m.media-amazon.com/images/I/71LNVGVpWYL.jpg',
        director: {
            name: 'Christopher Nolan',
            birthYear: '1970',
            deathYear: '',
            bio: 'Christopher Nolan CBE (born 30 July 1970) is a British-American film director, producer, and screenwriter. His films have grossed more than US$5.7 billion worldwide and have garnered 11 Academy Awards from 36 nominations.'
        }
        },
        {
            id: 2,
            title: 'Burlesque',
        description: 'The film tells the story of Ali (Aguilera), an aspiring singer who leaves her small hometown for Los Angeles, where she becomes a dancer at a struggling burlesque lounge owned by Tess (Cher).',
        genre: {
            name: 'Musical Drama',
            description: 'Musical film is a film genre in which songs by the characters are interwoven into the narrative, sometimes accompanied by dancing. The songs usually advance the plot or develop the film\'s characters, but in some cases, they serve merely as breaks in the storyline, often as elaborate "production numbers".'
        },
        imageURL: 'https://m.media-amazon.com/images/I/71-Brv648PL._AC_UF894,1000_QL80_.jpg',
        director: {
            name: 'Steven Antin',
            birthYear: '1958',
            deathYear: '',
            bio: 'Steven Antin (born April 19, 1958) is an American actor, stunt performer, screenwriter, producer, and director.'
        }
        },
        {
            id: 3,
            title: 'The Notebook',
        description: 'The film stars Ryan Gosling and Rachel McAdams as a young couple who fall in love in the 1940s. Their story is read from a notebook in the present day by an elderly man (played by James Garner), telling the tale to a fellow nursing home resident (played by Gena Rowlands, the director Cassavetes\' mother).',
        genre: {
            name: 'Romantic Drama',
            description: 'Romantic Drama film is a genre that explores the complex side of love. The plot usually centers around an obstacle that is preventing love between two people. The obstacles in Romantic Drama film can range from a family\'s disapproval, to forbidden love, to one\'s own psychological restraints.'
        },
        imageURL: 'https://m.media-amazon.com/images/I/81zHy+InA5L.jpg',
        director: {
            name: 'Nick Cassavetes',
            birthYear: '1959',
            deathYear: '',
            bio: 'Nicholas David Rowland Cassavetes is an American actor, director, and writer. He has directed such films as She\'s So Lovely, John Q., The Notebook, Alpha Dog, and My Sister\'s Keeper.'
        }
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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