import loadAnimeByGenre from "./loadAnimeByGenre";

// loadRandomAnimeByGenre fetches a random anime from a specific genre
// param genreID - the ID of the genre to filter anime
const loadRandomAnimeByGenre = async (genreID: string, limit = 25) => {

    // Find the total number of pages for the genre. This is necessary so that we do not fall out of bounds and return an empty array.
    const { pagination } = await loadAnimeByGenre(genreID, 1, limit);
    
    if (!pagination) {
        console.error('No pagination info returned for this genre.');
        return null;
    }
    const totalPages = pagination.last_visible_page || 1;

    // from the total number of pages, we randomly select one page
    const randomPage = Math.floor(Math.random() * totalPages) + 1;

    // From the randomly selected page, we load 25 anime from the selection
    const { data } = await loadAnimeByGenre(genreID, randomPage, limit);

    // We randomly select one anime from the 10 loaded if there are any
    if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);

        const randomAnime = data[randomIndex];
        return randomAnime;
    } else {
        console.error('No anime found for the given genre.');
        return null;
    }
};

export default loadRandomAnimeByGenre;