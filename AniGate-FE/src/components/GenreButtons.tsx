import genreList from '../assets/genreList'

type GenreButtonsProps = {
    onGenreClick: (genreID: string) => void
    loadingGenre: string | null
}


const GenreButtons: React.FunctionComponent<GenreButtonsProps> = ({ onGenreClick, loadingGenre }) => {




    return (
        <>
            <div>
                {Object.entries(genreList).map(([key, value]: [string, string]) =>
                (<button className={`btn ${loadingGenre === value ? 'btn-info opacity-50 text-neutral' : 'btn-primary'}`}
                    key={value}
                    onClick={() => onGenreClick(value)}
                >
                    {loadingGenre === value ? 'Loading...' : key}
                </button>))}
            </div>
        </>
    )
}

export default GenreButtons