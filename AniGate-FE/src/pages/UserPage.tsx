import NavBar from '../components/NavBar'
import useAnimeHandlers from '../api/useAnimeHandlers'
import FavoriteList from '../components/FavoriteList'
import ContentModal from '../components/ContentModal'


const UserPage = () => {
    const {
        favorites,
        openModal,
        handleCloseModal,
        loadingAnime,
        handleSaveFavoriteButton,
        handleDeleteFavoriteButton,
        currentAnime,
        loadingDirection,
        handleNextButton,
        handleBackButton,
        handleViewButton,
        selectedGenre

    } = useAnimeHandlers();


    return (
        <div>

            <>
                <NavBar />
                {/* {console.log('Parent favorites:', favorites)} */}

                <header className="mt-5 mb-5">
                    <h1 className="text-3xl font-semibold text-white/90">Favorites</h1>
                    <p className="text-l text-white/60">
                        View your Favorited Anime!
                    </p>
                </header>
                <FavoriteList
                    favorites={favorites}
                    onView={handleViewButton}

                />
                {currentAnime && (
                    <ContentModal
                        open={openModal}
                        loading={loadingAnime}
                        loadingDirection={loadingDirection}
                        onClose={handleCloseModal}
                        onNext={handleNextButton}
                        onBack={handleBackButton}
                        onSave={handleSaveFavoriteButton}
                        onDelete={handleDeleteFavoriteButton}
                        animeDetails={currentAnime}
                        selectedGenre={selectedGenre}
                        mode='favorite'
                    />
                )}




            </>
        </div>
    )
}

export default UserPage;
