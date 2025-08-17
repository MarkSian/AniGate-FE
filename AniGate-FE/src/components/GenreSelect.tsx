import axios from 'axios';


const GenreSelect = () => {

    const loadGenres = async () => {
        try {
            // Fetch data from Jikan API
            const firstResponse = await axios.get('https://api.jikan.moe/v4/genres/anime');
            console.log ('firstResponse logged', firstResponse.data.data);

        } catch (err) { 
            console.error('Error fetching genres:', err);
        }
    };

    // Call the function to load firstResponse
    loadGenres();

    return (
        <div>
            <h2>Select Genre</h2>
            {/* Genre selection UI will go here */}
        </div>
    );
}

export default GenreSelect;