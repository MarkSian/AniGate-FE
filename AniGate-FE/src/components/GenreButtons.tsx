import { useState } from 'react';
import genreList from '../assets/genreList';
import loadRandomAnimeByGenre from '../api/loadRandomAnimeByGenre';

const GenreButtons = () => {
    const [loadingGenre, setLoadingGenre] = useState<string | null>(null);

    // Handler for Genre Button Click
    // This fetches anime info based on the genre ID and console logs the anime object
    const handleGenreClick = async (genreID: string) => {
        if (loadingGenre) return; // Prevent double clicks
        setLoadingGenre(genreID);
        try {
            const anime = await loadRandomAnimeByGenre(genreID, 25);
            if (anime && anime.title) {
                alert(`Recommended Anime: ${anime.title}`);
                console.log(anime, anime.title);
            } else {
                alert('No anime found for this genre.');
            }
        } finally {
            setLoadingGenre(null);
        }
    };

    return (
        <>
            {/*Displays genre buttons from genreList object */}
            <div className="my-6 grid lg:grid-cols-4 grid-cols-3 lg:gap-6 gap-4">
                {Object.entries(genreList).map(([key, value]: [string, string]) => (
                    <button
                        key={value}
                        className={`btn w-full ${loadingGenre === value ? 'btn-info opacity-50 text-neutral' : 'btn-primary'}`}
                        onClick={() => handleGenreClick(value)}
                        
                    >
                        {loadingGenre === value ? 'Loading...' : key}
                    </button>
                ))}
            </div>
        </>
    );
};

export default GenreButtons;

