import type { Anime } from "./types/anime"
import { useEffect, useState } from 'react'
import genreList from '../assets/genreList';

type ContentModalProperties = {
    open: boolean
    loading: boolean
    loadingDirection: 'Next' | 'Back' | null
    onClose: () => void
    onNext: () => void
    onBack: () => void
    onSave: (animeDetails: Anime) => void
    onDelete: (mal_id: string) => void
    animeDetails: Anime
    selectedGenre: string
    mode: string


}

const ContentModal: React.FunctionComponent<ContentModalProperties> = ({ onClose, onNext, onBack, onSave, onDelete, open, loading, loadingDirection, selectedGenre, animeDetails, mode }) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    useEffect(() => {
        setIsClicked(false);
    }, [animeDetails]);

    const handleClick = () => {
        if (!isClicked && mode === 'browsing') {
            onSave(animeDetails);
            console.log('Favorited!');
        } else if (!isClicked && mode === 'favorite') {
            onDelete(animeDetails.mal_id);
        } else if (isClicked && mode === 'favorite') {
            onSave(animeDetails);
        }
        else {
            onDelete(animeDetails.mal_id);
            console.log('UnFavorited!');
        }
        setIsClicked(prev => !prev);

    };

    const genreName = Object.keys(genreList).find(key => genreList[key] === selectedGenre) || selectedGenre;


    if (!open) return null;

    if (loading) {
        return (
            <>
                <input type="checkbox" checked={open} readOnly id="my_modal_7" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box max-w-5xl flex flex-col items-center justify-center">
                        <img
                            src={
                                loadingDirection === 'Back'
                                    ? "images/Jeanne_Alter_FlagWave.gif"
                                    : loadingDirection === 'Next'
                                        ? "images/Jeanne_FlagWave.gif"
                                        : "images/Anime_Spinner.gif"
                            }
                            alt="Loading..."
                            className="mb-4 w-64 h-64 object-contain"
                        />
                        <h3 className="text-lg font-bold">
                            {loadingDirection === 'Back'
                                ? "Loading Previous Anime"
                                : loadingDirection === 'Next'
                                    ? "Loading Next Anime"
                                    : "Loading Anime"}
                        </h3>

                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                </div>
            </>
        );
    };


    if (loadingDirection) {
        return (
            <>
                <input type="checkbox" checked={open} readOnly id="my_modal_7" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box max-w-5xl flex flex-col items-center justify-center">
                        <img
                            src={
                                loadingDirection === 'Next'
                                    ? "images/Jeanne_FlagWave.gif"
                                    : "images/Jeanne_Alter_FlagWave.gif"
                            }
                            alt="Loading..."
                            className="mb-4 w-64 h-64 object-contain"
                        />
                        <h3 className="text-lg font-bold">
                            Loading Anime
                        </h3>

                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                </div>
            </>
        );
    };


    return (
        mode === 'favorite' ? (
            <>
                <input type="checkbox" checked={open} readOnly id="my_modal_7" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box max-w-5xl">
                        {/* Title */}
                        <h3 className='text-lg font-bold'>
                            {animeDetails.title}
                        </h3>
                        {/* Trailer */}
                        {animeDetails.trailer?.embed_url ? (
                            <div>
                                <iframe
                                    width="100%"
                                    height="400"
                                    src={animeDetails.trailer.embed_url}
                                    title="Anime Trailer"
                                    allowFullScreen
                                    className="rounded"
                                ></iframe>
                            </div>
                        ) : (
                            <img
                                src={animeDetails.images?.jpg?.large_image_url || animeDetails.images?.jpg?.image_url}
                                alt={animeDetails.title}
                                className="w-full max-h-96 object-contain rounded mb-4"
                            />
                        )}
                        {/* Synopsis */}
                        <p className="py-4">{animeDetails.synopsis || 'No synopsis available'}</p>
                        {/* Score */}
                        <p>{animeDetails.score ?? 'N/A'}</p>

                        <button
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >
                            ✕
                        </button>

                        <button className='btn btn-primary' onClick={handleClick}>
                            {isClicked ? 'Favorite' : 'UnFavorite'}
                        </button>

                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                </div>
            </>



        ) : (
            <>
                <input type="checkbox" checked={open} readOnly id="my_modal_7" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box max-w-5xl">
                        {/* Title */}
                        <h3 className='text-lg font-bold'>
                            {animeDetails.title} {genreName}
                        </h3>
                        {/* Trailer */}
                        {animeDetails.trailer?.embed_url ? (
                            <div>
                                <iframe
                                    width="100%"
                                    height="400"
                                    src={animeDetails.trailer.embed_url}
                                    title="Anime Trailer"
                                    allowFullScreen
                                    className="rounded"
                                ></iframe>
                            </div>
                        ) : (
                            <img
                                src={animeDetails.images?.jpg?.large_image_url || animeDetails.images?.jpg?.image_url}
                                alt={animeDetails.title}
                                className="w-full max-h-96 object-contain rounded mb-4"
                            />
                        )}
                        {/* Synopsis */}
                        <p className="py-4">{animeDetails.synopsis || 'No synopsis available'}</p>
                        {/* Score */}
                        <p>{animeDetails.score ?? 'N/A'}</p>

                        <button
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >
                            ✕
                        </button>

                        <button
                            onClick={onBack}
                            className='btn btn-primary'
                        >
                            Back
                        </button>

                        <button
                            onClick={onNext}
                            className='btn btn-primary'
                        >
                            Next
                        </button>

                        <button className='btn btn-primary' onClick={handleClick}>
                            {isClicked ? 'UnFavorite' : 'Favorite'}
                        </button>

                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                </div>

            </>
        )
    )
}

export default ContentModal