import type { Anime } from '../components/types/anime'
type FavoriteListProperties = {
    favorites: Anime[]
    onView: (mal_id: string) => void

}
const FavoriteList: React.FunctionComponent<FavoriteListProperties> = ({ favorites, onView }) => {



    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-4">
                {favorites.map(anime => (
                    <div
                        className="card bg-base-200 border border-primary shadow-lg flex flex-col"
                        key={anime.mal_id}
                    >
                        <div className="card-body p-4 flex flex-col items-center">
                            <h2 className="text-base font-semibold mb-3 text-center text-primary">{anime.title}</h2>
                            <img
                                src={anime.imageUrl}
                                alt={anime.title}
                                className="w-full max-h-56 object-contain rounded mb-3 border border-base-300"
                            />
                            <div className="bg-base-100/70 border border-base-300 rounded-md p-3 mb-3 max-h-28 overflow-y-auto shadow-inner w-full">
                                <h4 className="text-sm font-bold text-primary mb-1 tracking-wide text-left">Synopsis</h4>
                                <p className="text-sm text-base-content leading-relaxed whitespace-pre-line text-left">
                                    {anime.synopsis || 'No synopsis available'}
                                </p>
                            </div>
                            <button
                                className="genre-button w-full mt-auto"
                                onClick={() => onView(anime.mal_id)}
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}

export default FavoriteList