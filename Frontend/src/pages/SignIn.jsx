import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            let result;
            try {
                result = await response.json();
            } catch (jsonError) {
                if (response.status === 409) {
                    alert('A user with this email or username already exists.');
                } else {
                    alert('An unexpected error occurred.');
                }
                return;
            }
            if (!response.ok) {
                if (response.status === 409) {
                    alert(result.message || 'A user with this email or username already exists.');
                } else {
                    alert(result.message || 'Something went wrong');
                }
                return;
            }

            console.log('Success:', result);
            login(result.data);
            navigate(`/c/${result.data.username}`);
            setData({
                fullName: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
            alert('User registered successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred.');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#000000] border border-gray-800 rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold tracking-tight mb-2">Create an Account</h3>
                    <p className="text-gray-400 text-sm">Enter your details to get started</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="fullName" className="text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={data.fullName}
                            onChange={handleChange}
                            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                            id="fullName"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium text-gray-300">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                            id="username"
                            placeholder="Choose a username"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                            id="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                            id="password"
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                            id="confirmPassword"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors mt-6"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-800"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#000000] px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="w-full bg-[#1a1a1a] text-white border border-gray-800 font-medium py-3 rounded-lg hover:bg-[#2a2a2a] transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Google
                </button>

                <div className="text-center mt-6">
                    <p className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-white font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default SignIn;
