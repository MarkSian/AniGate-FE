import GenreButtons from '../components/GenreButtons';
import ContentModal from '../components/ContentModal';
import useAnimeHandlers from '../api/useAnimeHandlers'
import NavBar from '../components/NavBar';



const ContentPage = () => {
    const {
        openModal,
        handleGenreClick,
        handleCloseModal,
        currentAnime,
        handleNextButton,
        handleBackButton,
        handleSaveFavoriteButton,
        handleDeleteFavoriteButton,
        loadingGenre,
        loadingAnime,
        loadingDirection,
        selectedGenre,
    } = useAnimeHandlers();



    return (
        <div className=' relative min-h-screen w-full overflow-hidden bg-center bg-cover bg-[url(/images/night-anime-cityscape-background.jpg)]'>
            <NavBar />

            <header className="mt-5 mb-5">
                <h1 className="text-3xl font-semibold text-white/90">Browse by Genre</h1>
                <p className="text-l text-white/60">
                    Choose a genre to discover a highly-rated random anime.
                </p>
            </header>

            <div className="rounded-2xl border border-white/15 bg-black/40 p-4 sm:p-6 backdrop-blur-xl shadow-2xl" >
                <GenreButtons onGenreClick={handleGenreClick} loadingGenre={loadingGenre} />
            </div>

            {
                currentAnime && (
                    <ContentModal
                        open={openModal}
                        loading={loadingAnime}
                        onClose={handleCloseModal}
                        animeDetails={currentAnime}
                        onNext={handleNextButton}
                        onBack={handleBackButton}
                        onSave={handleSaveFavoriteButton}
                        onDelete={handleDeleteFavoriteButton}
                        loadingDirection={loadingDirection}
                        selectedGenre={selectedGenre}
                        mode='browsing'
                    />
                )
            }
        </div >
    )
}


export default ContentPage;