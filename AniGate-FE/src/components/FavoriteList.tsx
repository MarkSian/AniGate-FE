import type { Anime } from '../components/types/anime'
type FavoriteListProperties = {
    favorites: Anime[]
    onView: (mal_id: string) => void

}
const FavoriteList: React.FunctionComponent<FavoriteListProperties> = ({ favorites, onView }) => {
    const animeImage = favorites.map(a => a.imageUrl);
    console.log(animeImage);



    return (

        <>
            <div className='grid grid-cols-3'>
                {favorites.map(anime => (
                    <div className='card'
                        key={anime.mal_id}
                    >
                        <div className='card-body'>
                            <h2>{anime.title}</h2>
                            <img src={anime.imageUrl} alt={anime.title}

                                className="w-full max-h-96 object-contain rounded mb-4"
                            />
                            <p></p>
                            <p>{anime.synopsis}</p>
                            <button
                                className='btn btn-primary'
                                onClick={() => onView(anime.mal_id)}>
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