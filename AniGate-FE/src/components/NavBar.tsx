import { Link } from 'react-router-dom';

const NavBar = () => {



    return (
        <nav>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/content">Content</Link></li>
                <li><Link to="/user">User Page</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;