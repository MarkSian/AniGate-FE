import axios from 'axios';

const loadAnimeByGenre = async () => {
        try {
            const firstResponse = await axios.get('https://api.jikan.moe/v4/anime?genre=1');
            console.log('Adventure genre data:', firstResponse); 

        } catch (err) {
            console.error('Error fetching anime from Adventure genre:', err);
        }
    };

export default loadAnimeByGenre;