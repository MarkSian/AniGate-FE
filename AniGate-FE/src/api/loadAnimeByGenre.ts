import axios from 'axios';

// loadAnimeByGenre fetches anime based on genre ID, with pagination and limit options
// param genreID - the ID of the genre to filter anime
// param page - the page number for pagination (default is 1)
// param limit - the number of results per page (default is 1)
// returns a promise that resolves to an object containing the anime data and pagination info
const loadAnimeByGenre = async (genreID: string, page: number = 1, limit: number = 1) => {
        try {
            // params for the API request
            const params = {
                sort: 'asc',
                page,
                limit,
                sfw: true,
                min_score: 8.5,
                genres: genreID,
            }
            const firstResponse = await axios.get('https://api.jikan.moe/v4/anime', { params });
            // console.log('First response data:', firstResponse.data.data);
            // console.log('Pagination info:', firstResponse.data.pagination);
            return {
                data: firstResponse.data.data,
                pagination: firstResponse.data.pagination,
            };
        } catch (err) {
            console.error('Error fetching anime from genre:', err);
            return { data: [], pagination: null };
        }
};

   
export default loadAnimeByGenre;