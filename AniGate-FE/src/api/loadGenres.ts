import axios from 'axios';

const loadGenres = async () => {
        try {
            // Fetch data from Jikan API
            const firstResponse = await axios.get('https://api.jikan.moe/v4/genres/anime');
            console.log ('firstResponse logged', firstResponse.data.data);

        } catch (err) { 
            console.error('Error fetching genres:', err);
        }
    };

export default loadGenres;