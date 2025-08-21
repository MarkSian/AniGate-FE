import axiosInstance from "../api/connector"
import ContentModal from "./ContentModal";
import { useState, useEffect } from "react";


const HandleFavorites: React.FunctionComponent<HandleFavoritesProps> = () => {
    const [favorites, setFavorites] = useState<any[]>([]);


    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const getFavorites = await axiosInstance.get('/aniGate/favorites');
                if (getFavorites.data.length > 0)
                    setFavorites(getFavorites.data);
            } catch (err) {
                console.error('Error Fetching Favorites', err)
            }
        };
        if (!favorites) fetchFavorites();

    }, [])


    const saveFavorites = async (anime: any) => {
        try {
            const saveAnime = await axiosInstance.post('/aniGate/favorites', anime);
            setFavorites(favoriteList => [...favoriteList, anime]);
        } catch (err) {
            console.error('Error saving favorites:', err);
        }

    };

    const deleteFavorite = async (mal_id: any) => {
        try {
            const deleteAnime = await axiosInstance.delete(`/aniGate/favorite/${mal_id}`);
            setFavorites(favoriteList => favoriteList.filter(favoriteAnime => favoriteAnime.mal_id != mal_id));

        } catch (err) {
            console.error('Error deleting anime from favorites', err);
        }
    };

    return (
        <>
            <ContentModal
            />

        </>
    )
}

export default HandleFavorites;