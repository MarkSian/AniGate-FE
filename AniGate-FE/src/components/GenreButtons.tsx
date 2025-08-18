import genreList from '../assets/genreList';
import loadGenres from '../api/loadGenres';
import { useEffect, useState } from 'react';


const GenreButtons = () => {

    useEffect(() => {
        // Load genres when the component is mounted
        loadGenres()
            .then(() => console.log('Genres loaded successfully'))

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

