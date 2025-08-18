import NavBar from '../components/NavBar'
import GenreButtons from '../components/GenreButtons';


const ContentPage = () => {




    return (
        <div className='items-center justify-center min-h-screen bg-cover bg-center bg-[url(/images/night-anime-cityscape-background.jpg)]'>
            <NavBar />
            <GenreButtons />
            <h1>Content Page</h1>
        </div>
    )
}


export default ContentPage;