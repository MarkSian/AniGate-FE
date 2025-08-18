// Define the properties interface for type safety
interface ContentModalProperties {
    open: boolean; // indicates if modal is open
    anime: any | null; // anime object to display, can be null until a selection is made
    onClose: () => void; // set to void so it can be used as a callback function
    onNext: () => void; // callback for next anime, 
    loading: boolean;
    // onPrevious: () => void; // callback for previous anime, 
}

const ContentModal: React.FunctionComponent<ContentModalProperties> = ({ open, anime, onClose, onNext, loading }) => {
    // Case when the modal is not open, return null to prevent any rendering
    if (!open) return null;

    if (loading) {
        return (
            <>
                <input type="checkbox" checked={open} readOnly id="my_modal_7" className="modal-toggle" />
                <div className="modal" role="dialog">
                    <div className="modal-box max-w-5xl flex flex-col items-center justify-center">
                        <img
                            src="/images/Jeanne_FlagWave.gif"
                            alt="Loading..."
                            className="mb-4 w-64 h-64 object-contain"
                        />
                        <h3 className="text-lg font-bold">Loading next anime...</h3>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                </div>
            </>
        );
    }

    // Render the modal with information related to the anime content
    return (
        <>
            <input type="checkbox" checked={open} readOnly id="my_modal_7" className="modal-toggle" />
                <div className="modal" role="dialog">
                <div className="modal-box max-w-5xl">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"onClick={onClose} >✕</button>
                    {/* Title */}
                    <h3 className='text-lg font-bold'>{anime.title}</h3>
                    {/* Trailer */}
                    {anime.trailer?.embed_url ? (
                        <div>
                            <iframe
                                width="100%"
                                height="400"
                                src={anime.trailer.embed_url}
                                title="Anime Trailer"
                                allowFullScreen
                                className="rounded"
                            ></iframe>
                        </div>
                    ) : (
                        <img
                            src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
                            alt={anime.title}
                            className="w-full max-h-96 object-contain rounded mb-4"
                        />
                    )}
                    {/* Synopsis */}
                    <p className="py-4">{anime.synopsis || 'No synopsis available'}</p>
                    {/* Score */}
                    <p>{anime.score ?? 'N/A'}</p>
                    <button>Previous</button>
                    <button
                        className="btn btn-primary"
                        onClick={onNext}
                        disabled={loading} // Disable while loading
                    >
                        {loading ? "Loading..." : "Next"}
                    </button>
                </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        
        
        </>
                
    )
}

export default ContentModal;

