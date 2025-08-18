import genreList from '../assets/genreList';
import loadRandomAnimeByGenre from '../api/loadRandomAnimeByGenre';



const GenreButtons = () => {

    // Handler for Genre Button Click
    // This fetches anime info based on the genre ID and console logs the anime object
    const handleGenreClick = async (genreID: string) => {
        const anime = await loadRandomAnimeByGenre(genreID);
        if (anime) {
            alert(`Random anime: ${anime.title}`);
            console.log(anime);
        } else {
            alert('No anime found for this genre.');
        }
    };

    return (
       <>
         {/*Displays genre buttons from genreList object */}
        <div className="my-6 grid lg:grid-cols-4 grid-cols-3 lg:gap-6 gap-4">
            {Object.entries(genreList).map(([key, value]:[string, string]) => (
                <button
                    key={value}
                    className="btn btn-primary w-full"
                    onClick={() => handleGenreClick(value)}
                >
                    {key}
                </button>
            ))}
        </div>
        
       

       
       </>
    );
};

export default GenreButtons;

