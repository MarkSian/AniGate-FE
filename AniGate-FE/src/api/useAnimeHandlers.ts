import loadRandomAnimeByGenre from "./loadRandomAnimeByGenre";
import type { Anime } from '../components/types/anime'
import axiosInstance from "./connector";
import { useState, useEffect, useRef } from 'react'

const animeHandler = () => {
    const [openModal, setModalOpen] = useState<boolean>(false)
    const [selectedGenre, setSelectedGenre] = useState<string>('')
    const [currentAnime, setCurrentAnime] = useState<Anime | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [animeHistory, setAnimeHistory] = useState<Anime[]>([]);
    const [favorties, setFavorites] = useState<Anime[]>([]);
    const [loadingGenre, setLoadingGenre] = useState<string | null>(null);
    const [loadingAnime, setLoadingAnime] = useState<boolean>(false);
    const [loadingDirection, setLoadingDirection] = useState<'Next' | 'Back' | null>(null);
    const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    useEffect(() => {
        if (currentIndex >= 0 && animeHistory[currentIndex]) {
            setCurrentAnime(animeHistory[currentIndex]);
        }
    }, [currentIndex, animeHistory]);

    useEffect(() => {
        console.log('Current Index (effect)', currentIndex);
        console.log('AnimeHistory (effect)', animeHistory);
    }, [currentIndex, animeHistory]);

    // Track and Clear Timeouts
    const clearLoadingTimeout = () => {
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
            loadingTimeoutRef.current = null;
        }
    };


    // Handler to open modal
    const handleGenreClick = async (genreID: string) => {
        const start = Date.now();
        const elapsed = Date.now() - start;
        const minLoading = 1000;

        if (loadingGenre) return;

        setLoadingGenre(genreID);
        setSelectedGenre(genreID);
        setModalOpen(true);
        setLoadingAnime(true);


        try {
            const anime: Anime = await loadRandomAnimeByGenre(genreID, 25);
            if (anime && anime.title)
                console.log('Anime Title', anime.title)
            setCurrentAnime(anime);
            setAnimeHistory([anime]);
            setCurrentIndex(0);

        } catch (err) {
            console.error('Failed Fetching Random Anime', err)
        };

        if (elapsed < minLoading) {
            setTimeout(() => {
                setLoadingAnime(false);
                setLoadingGenre(null);

            }, minLoading - elapsed);
        } else {
            setLoadingAnime(false);
            setLoadingGenre(null);
        }



    };
    // Handler to close modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Handler for Next Button
    const handleNextButton = async () => {
        clearLoadingTimeout();
        const start = Date.now();
        const minLoading = 1500;

        if (!selectedGenre) return;

        setLoadingAnime(true);
        setLoadingDirection('Next');

        // Move forward in history if possible
        if (currentIndex < animeHistory.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCurrentAnime(animeHistory[currentIndex + 1]);

            const elapsed = Date.now() - start;
            loadingTimeoutRef.current = setTimeout(() => {
                setLoadingAnime(false);
                setLoadingDirection(null);
            }, Math.max(minLoading - elapsed, 0));
            return;
        }

        // Otherwise, fetch a new anime and add to history
        try {
            const anime: Anime = await loadRandomAnimeByGenre(selectedGenre, 25);
            setAnimeHistory(hist => [...hist, anime]);
            setCurrentIndex(hist => hist + 1);
            setCurrentAnime(anime);
        } catch (err) {
            console.error('Error fetching next anime', err);
        }

        const elapsed = Date.now() - start;
        loadingTimeoutRef.current = setTimeout(() => {
            setLoadingAnime(false);
            setLoadingDirection(null);
        }, Math.max(minLoading - elapsed, 0));
    };

    // Handler for Back Button
    const handleBackButton = () => {
        clearLoadingTimeout();
        const start = Date.now();
        const minLoading = 1500;

        if (!selectedGenre) return;
        setLoadingAnime(true);
        setLoadingDirection('Back');
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setCurrentAnime(animeHistory[currentIndex - 1]);
        }

        const elapsed = Date.now() - start;
        loadingTimeoutRef.current = setTimeout(() => {
            setLoadingAnime(false);
            setLoadingDirection(null);
        }, Math.max(minLoading - elapsed, 0));

        console.log('Back Button Clicked');
        console.log('Current Index', currentIndex);
        console.log('AnimeHistory', animeHistory);
    };

    // Handle onFavorite Clicks
    const handleSaveFavoriteButton = async (anime: Anime) => {
        const animePayLoad = {
            title: anime.title,
            genres: anime.genres.map((g: any) => g.name),
            rating: anime.score,
            imageURL: anime.images.jpg.image_url,
            synopsis: anime.synopsis,
            mal_id: anime.mal_id
        }
        try {
            await axiosInstance.post('/aniGate/favorite', animePayLoad);
            setFavorites(fav => [...fav, anime])
        } catch (err) {
            console.error('Error saving anime', err)
        }
        console.log(animePayLoad)
    };

    const handleDeleteFavoriteButton = (mal_id: string) => {
        try {
            axiosInstance.delete(`/aniGate/favorite/${mal_id}`)
            setFavorites(fav => fav.filter((favAnime) => favAnime.mal_id != mal_id))
            console.log('Anime List after deleting', favorties)

        } catch (err) {
            console.error('Error deleting anime', err)
        }
    }


    return {
        openModal,
        handleGenreClick,
        handleCloseModal,
        selectedGenre,
        loadingGenre,
        loadingAnime,
        loadingDirection,
        currentAnime,
        currentIndex,
        handleNextButton,
        handleBackButton,
        handleSaveFavoriteButton,
        handleDeleteFavoriteButton,
        favorties

    }
}


export default animeHandler