import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Facebook, Twitter } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }
        setError("");
        // Navigate to homepage
        navigate("/");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8">Login ke lapor<span className="text-red-600 font-bold">PAK</span></h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                        <input type="checkbox" id="remember" className="w-4 h-4" />
                        <label htmlFor="remember">Ingat saya</label>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="cursor-pointer px-6 py-2 border-2 bg-red-600 text-white font-semibold rounded-none hover:bg-red-700 transition w-full"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <a href="#" className="text-gray-600 underline">
                        Buat akun baru
                    </a>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 mb-2">Atau masuk dengan</p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-red-600 hover:bg-red-700 text-white p-2 w-9 h-9 rounded-full cursor-pointer flex items-center justify-center">
                            <FontAwesomeIcon icon={faGoogle} />
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white p-2 w-9 h-9 rounded-full cursor-pointer flex items-center justify-center">
                            <Facebook size={18} />
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 text-white p-2 w-9 h-9 rounded-full cursor-pointer flex items-center justify-center">
                            <Twitter size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;