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
                    selectedGenre={selectedGenre}
                    mode='browsing'
                />
            )}
        </div>
    )
}


export default ContentPage;