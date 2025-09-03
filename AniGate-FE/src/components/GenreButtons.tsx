import genreList from '../assets/genreList'

type GenreButtonsProps = {
    onGenreClick: (genreID: string) => void
    loadingGenre: string | null
}


const GenreButtons: React.FunctionComponent<GenreButtonsProps> = ({ onGenreClick, loadingGenre }) => {




    return (
        <>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {Object.entries(genreList).map(([key, value]: [string, string]) =>
                (<button className='genre-button'
                    key={value}
                    onClick={() => onGenreClick(value)}
                >
                    {loadingGenre === value ? 'Loading...' : key}
                </button>)
                )}
            </div>
        </>
    )
}

export default GenreButtons