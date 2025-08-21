import { useState, useEffect } from 'react';
import genreList from '../assets/genreList';
import loadRandomAnimeByGenre from '../api/loadRandomAnimeByGenre';
import ContentModal from './ContentModal';

const GenreButtons = () => {
    const [loadingGenre, setLoadingGenre] = useState<string | null>(null);
    const [loadingAnime, setLoadingAnime] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState(false); // Set to false initially 
    const [selectedAnime, setSelectedAnime] = useState<string | null>(null); // Set to null initially to indicate no anime is selected
    const [currentGenre, setCurrentGenre] = useState<string | null>(null); // Track the current genre
    const [animeHistory, setAnimeHistory] = useState<any[]>([]); // array to keep objects of anime history
    const [currentIndex, setCurrentIndex] = useState<number>(-1); // Track curreent index starting at -1 as no anime is selected initially
    const [loadingDirection, setLoadingDirection] = useState<'next' | 'back' | null>(null);

    useEffect(() => {
        if (currentIndex >= 0 && animeHistory[currentIndex]) {
            setSelectedAnime(animeHistory[currentIndex]);
        }
    }, [currentIndex, animeHistory]);

    // Handler for Genre Button Click
    // This fetches anime info based on the genre ID and console logs the anime object
    const handleGenreClick = async (genreID: string) => {
        if (loadingGenre) return; // Prevent double clicks
        setLoadingGenre(genreID);
        setCurrentGenre(genreID);
        try {
            const anime = await loadRandomAnimeByGenre(genreID, 25);
            if (anime && anime.title) {
                setSelectedAnime(anime); // set the selected anime object
                setAnimeHistory([anime]); // set the anime history with the current anime
                setCurrentIndex(0); // Reset current index to 0 as we have a new selection
                setModalOpen(true); // Open the modal
            } else {
                alert('No anime found for this genre.');
            }
        } finally {
            setLoadingGenre(null);
        }
    };

    // Handler to close the modal. Set to false to clsoe the modal
    const handleCloseModal = () => setModalOpen(false);

    // Handler for next button event
    const handleNextClick = async () => {
        setLoadingDirection('next');
        setLoadingAnime(true);
        if (!currentGenre) return;

        const start = Date.now();
        const displayedId = animeHistory.map(a => a.mal_id);
        let anime = null;
        let attempts = 0;

        while ((!anime || displayedId.includes(anime.mal_id)) && attempts < 10) {
            anime = await loadRandomAnimeByGenre(currentGenre, 25);
            attempts++;
        }

        if (anime && anime.title) {
            const newHistory = [...animeHistory.slice(0, currentIndex + 1), anime];
            setAnimeHistory(newHistory);
            setCurrentIndex(newHistory.length - 1);
            setSelectedAnime(anime);
        } else {
            alert('No more anime available in this genre.');
        }
        const elapsed = Date.now() - start;
        const minLoading = 3500;
        if (elapsed < minLoading) {
            setTimeout(() => {
                setLoadingAnime(false);
                setLoadingDirection(null);
            }, minLoading - elapsed);
        } else {
            setLoadingAnime(false);
            setLoadingDirection(null);
        }
    };

    // Handler for the back button on the ContentModal
    const handleBackClick = () => {
        setLoadingDirection('back');
        setLoadingAnime(true);
        const start = Date.now();

        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setSelectedAnime(animeHistory[currentIndex - 1]);
        }
        const elapsed = Date.now() - start;
        const minLoading = 3500;
        if (elapsed < minLoading) {
            setTimeout(() => {
                setLoadingAnime(false);
                setLoadingDirection(null);
            }, minLoading - elapsed);
        } else {
            setLoadingAnime(false);
            setLoadingDirection(null);
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
            {/* Render ContentModal and pass handlers and properties */}
            <ContentModal
                open={modalOpen}
                anime={selectedAnime}
                onClose={handleCloseModal}
                onNext={handleNextClick}
                onBack={handleBackClick}
                loading={loadingAnime}
                loadingDirection={loadingDirection}
                saveFavorites={saveFavorites} // <-- add this
                deleteFavorite={deleteFavorite} // <-- add this
            />
        </>
    );
};

export default GenreButtons;

