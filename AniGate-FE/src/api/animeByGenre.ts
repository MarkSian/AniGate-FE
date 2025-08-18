import axios from 'axios';

const loadAnimeByGenreAdventure = async () => {
        try {
            const firstResponse = await axios.get('https://api.jikan.moe/v4/anime?genre=1');
            console.log('Adventure genre data:', firstResponse); 

        } catch (err) {
            console.error('Error fetching anime from Adventure genre:', err);
        }
    };

    //call the function to load anime by genre
    loadAnimeByGenreAdventure();