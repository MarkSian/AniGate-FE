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
            // console.log('Favorited!');
        } else if (!isClicked && mode === 'favorite') {
            onDelete(animeDetails.mal_id);
        } else if (isClicked && mode === 'favorite') {
            onSave(animeDetails);
        }
        else {
            onDelete(animeDetails.mal_id);
            // console.log('UnFavorited!');
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
                        <div className="bg-base-200/70 border border-base-300 rounded-xl p-4 my-4 max-h-48 overflow-y-auto shadow-md">
                            <h4 className="text-base font-bold text-primary mb-2 tracking-wide">Synopsis</h4>
                            <p className="text-sm text-base-content leading-relaxed whitespace-pre-line">
                                {animeDetails.synopsis || 'No synopsis available'}
                            </p>
                        </div>
                        {/* Score */}
                        <p>{animeDetails.score ?? 'N/A'}</p>

                        <button
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >
                            ✕
                        </button>

                        <button className='genre-button' onClick={handleClick}>
                            {isClicked ? 'Favorite' : 'Unfavorite'}
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
                        {/* Title Row */}
                        <div className="relative mb-6">
                            {/* Genre */}
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-base font-semibold text-gray-400">
                                {genreName}
                            </span>
                            {/* Title centered */}
                            <h3 className="text-lg font-bold text-center">
                                {animeDetails.title}
                            </h3>
                        </div>
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
                        <div className="bg-base-200/70 border border-base-300 rounded-xl p-4 my-4 max-h-48 overflow-y-auto shadow-md">
                            <h4 className="text-base font-bold text-primary mb-2 tracking-wide">Synopsis</h4>
                            <p className="text-sm text-base-content leading-relaxed whitespace-pre-line">
                                {animeDetails.synopsis || 'No synopsis available'}
                            </p>
                        </div>
                        {/* Score */}
                        <p className="font-bold text-primary">
                            Rating: {animeDetails.score ?? 'N/A'}
                        </p>

                        <button
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >
                            ✕
                        </button>

                        {/* Button Row */}
                        <div className="flex justify-between items-center mt-6 gap-4">
                            <button
                                onClick={onBack}
                                className='genre-button'
                            >
                                Back
                            </button>
                            <button className='genre-button' onClick={handleClick}>
                                {isClicked ? 'Unfavorite' : 'Favorite'}
                            </button>
                            <button
                                onClick={onNext}
                                className='genre-button'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                </div>

            </>
        )
    )
}

export default ContentModal