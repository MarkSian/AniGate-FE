import axiosInstance from "../api/connector";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axiosInstance.post(
                "/auth/login",
                { username, password },
                { withCredentials: true }
            );
            navigate("/content");
        } catch (err) {
            alert("Login failed. Please check your credentials.");
            console.error(err);
        }
    };

    return (
        <div
            className="relative min-h-screen w-full overflow-hidden bg-center bg-cover"
            style={{
                backgroundImage:
                    "url(/images/night-anime-cityscape-background.jpg)",
            }}
            aria-label="Login screen"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_40%_at_50%_10%,rgba(34,211,238,0.16),transparent_70%),radial-gradient(40%_30%_at_80%_10%,rgba(232,121,249,0.12),transparent_70%)]" />

            <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    {/* AniGate Title */}
                    <div className="mb-8 flex flex-col items-center">
                        <span className="text-4xl font-extrabold tracking-wide text-primary drop-shadow-lg">
                            AniGate
                        </span>
                    </div>
                    <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight text-white/90">
                        Discover Anime by Genre
                    </h1>

                    <div className="mb-5 text-center text-primary">
                        <h2 className="text-lg font-medium">Have an account?</h2>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4" id="login-form">
                        <div>
                            <label
                                htmlFor="username"
                                className="mb-1 block text-sm text-white/80"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={username}
                                autoComplete="username"
                                onChange={(e) => setUsername(e.target.value)}
                                className="input input-bordered w-full border-white/20 bg-black/30 text-white placeholder-white/40 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded-2xl"
                                placeholder="Your username"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm text-white/80"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={password}
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full border-white/20 bg-black/30 text-white placeholder-white/40 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40 rounded-2xl"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block mt-2 rounded-2xl border-0 shadow-[0_0_24px_rgba(34,211,238,0.5)] hover:brightness-110 hover:shadow-[0_0_36px_rgba(34,211,238,0.7)]"
                        >
                            Login
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-3 text-white/40">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs">or</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <p className="text-center text-sm text-primary">
                        Don't have an account?{" "}
                        <Link to="/register" className="link link-primary">
                            Register
                        </Link>
                    </p>
                </div>
            </section>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-400/10 to-transparent" />
        </div>
    );
};

export default LoginPage;