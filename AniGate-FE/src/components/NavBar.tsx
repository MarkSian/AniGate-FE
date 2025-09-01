import { Link } from 'react-router-dom';


const NavBar = () => {



    return (
        <>
            <div className="navbar bg-base-300 center-container mt-4 py-2 my-2 rounded-[15px] shadow-xl">
                <div className="navbar-start">
                    <Link to='/content'>ContentPage</Link>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost text-3xl font-bold">AniGate
                    </a>
                </div>
                <div className="navbar-end">
                    <Link to='/user'>FavoritePage</Link>
                </div>
            </div>


        </>

    )
}

export default NavBar;