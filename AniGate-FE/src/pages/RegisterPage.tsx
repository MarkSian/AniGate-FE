import axiosInstance from '../api/connector';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axiosInstance.post('/auth/register', { username, password});
            alert('Registration successful! You can now log in.');
            navigate('/login');
        } catch (err) {
            alert('Registration Failed.');
        }
    };

    return (

        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-base">
                <h1 className="text-4xl font-bold text-primary mb-12 mt-4">AniVault</h1>
                <div className="card w-96 bg-base-100 shadow-xl border-2 border-primary">
                    <div className="card-body">
                        <h2 className="card-title justify-center mb-4 text-2xl text-primary">Register</h2>
                        <form onSubmit={handleRegister} className="flex flex-col gap-4">
                            {/* Username and Password Inputs*/}
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                                className="input input-bordered input-primary border-2 border-primary w-full bg-base-100 text-primary"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                className="input input-bordered input-primary border-2 border-primary w-full bg-base-100 text-primary"
                                required
                            />
                            <button type="submit" className="btn btn-primary w-full mt-2">
                                Register
                            </button>
                        </form>
                        <p className="mt-4 text-sm text-center text-primary">
                            Already have an account?{" "} {/*this line was added for spacing */}
                            <Link to="/login" className="link link-primary">
                                Log In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>

    )
}

export default RegisterPage;
