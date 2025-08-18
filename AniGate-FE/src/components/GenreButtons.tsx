import genreList from '../assets/genreList';
import loadGenres from '../api/loadGenres';
import loadAnimeByGenre from '../api/loadAnimeByGenre';
import { useEffect, useState } from 'react';


const GenreButtons = () => {

    useEffect(() => {
        // Load genres when the component is mounted
        try {
            loadGenres();
            console.log('Genres loaded successfully');
        } catch (err) {
            console.error('Error loading genres:', err);
        };

    }, [])

    useEffect(() => {
        // Load anime by genre when the component is mounted
        try {
            loadAnimeByGenre();
            console.log('Anime by genre loaded successfully');
        } catch (err) {
            console.error('Error loading anime by genre:', err);
        }
    }, [])

    return (
       <>
         {/*Displays genre buttons from genreList object */}
        <div className="my-6 grid lg:grid-cols-4 grid-cols-3 lg:gap-6 gap-4">
            {Object.entries(genreList).map(([key, value]:[string, string]) => (
                <button
                    key={value}
                    className="btn btn-primary w-full"
                    onClick={() => console.log(`Selected genre: ${key}`)}
                >
                    {key}
                </button>
            ))}
        </div>
        
       

       
       </>
    );
};

export default GenreButtons;

