import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/connector';


const NavBar = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        try {
            axiosInstance.post('/auth/Logout')
            navigate('/');

        } catch (err) {
            console.error('Could Not Log Out', err)
        }

    };



    return (
        <>
            <div className="navbar bg-base-300 center-container mt-4 py-2 my-2 rounded-[15px] shadow-xl">
                <div className="navbar-start">
                    <button className='genre-button'>
                        <Link to='/user'>Your Favorites</Link>
                    </button>

                </div>
                <div className="navbar-center">
                    <Link
                        className="btn btn-ghost text-3xl font-bold"
                        to='/content'>AniGate</Link>

                </div>
                <div className="navbar-end">

                    <button
                        onClick={handleLogOut}
                        className='genre-button'
                    >
                        Log Out
                    </button>

                </div>
            </div>


        </>

    )
}

export default NavBar;