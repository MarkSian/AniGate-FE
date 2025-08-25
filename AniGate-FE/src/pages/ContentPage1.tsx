import NavBar from '../components/NavBar'
import GenreButtons from '../components/GenreButtons';
import ContentModal from '../components/ContentModal';
import useAnimeHandlers from '../api/useAnimeHandlers'



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
        loadingDirection

    } = useAnimeHandlers();



    return (
        <div className='items-center justify-center min-h-screen bg-cover bg-center bg-[url(/images/night-anime-cityscape-background.jpg)]'>
            <NavBar />
            <GenreButtons onGenreClick={handleGenreClick} loadingGenre={loadingGenre} />
            {currentAnime && (
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
                />
            )}
            <h1>Content Page</h1>
        </div>
    )
}


export default ContentPage;