import axiosInstance from '../api/connector';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Await for the login request at the /auth/login endpoint
            await axiosInstance.post('/auth/login', { username, password }, { withCredentials: true });
            // If the await promise resolves, navigate to the content page
            navigate('/content');

        } catch (err) {
            // If the promise is rejected, an alert will pop up
            alert('Login failed. Please check your credentials.');
            console.error(err);
        }
    };




    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-[url(/images/night-anime-cityscape-background.jpg)]">
                <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
                <h1 className="text-xl font-bold text-primary mb-12 mt-4">Title</h1>
                <div className="card w-96 left-95 ">
                    <div className="card-body ">
                        <h2 className="card-title justify-center mb-4 text-2xl text-primary">Login</h2>
                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            {/* Username and Password Inputs*/}
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                                className="input input-lg" />


                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={event => setPassword(event.target.value)}
                                className="input input-lg" />
                            <button type="submit" className="btn btn-primary w-full mt-2">
                                Login
                            </button>
                        </form>
                        <p className="mt-4 text-sm text-center text-primary">
                            Don't have an account?{" "} {/*this line was added for spacing */}
                            <Link to="/register" className="link link-primary">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;