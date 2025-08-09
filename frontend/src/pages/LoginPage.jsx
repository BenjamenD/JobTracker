import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../api/axiosInstance.js';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });

            if (!data.token){
                setErrorMsg(data.msg);
                return;
            }

            localStorage.setItem('token', data.token);
            navigate(redirect);
        } catch (error) {
            setErrorMsg(error.response.data.msg);
            console.error(`Registration failed: ${error.message}`);        }
    };

    return (
        <div className="min-h-[70vh] flex-col items-center justify-center">
            <form 
                onSubmit={handleSubmit}
                className="bg-white/80 backdrop-blur border border-slate-200 p-6 rounded-xl shadow-sm w-full max-w-sm mx-auto"
            >
                <h2 className="text-2xl font-semibold mb-1 text-center text-slate-900">Login</h2>
                <p className="text-center text-sm text-slate-500 mb-4">Welcome back</p>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full border border-slate-300 focus:border-slate-400 focus:outline-none px-3 py-2 rounded-md bg-white"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full border border-slate-300 focus:border-slate-400 focus:outline-none px-3 py-2 rounded-md bg-white"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition"
                >
                    Login
                </button>
            </form>

            {errorMsg && <div className='text-red-700 mb-2 mt-5 text-center text-sm'>{errorMsg}</div>}

            <div className="text-center w-full mt-10">
                <button
                    onClick={() => navigate('/register')}
                    className="text-sm text-slate-600 hover:text-slate-900 underline-offset-2 hover:underline"
                >
                    Dont have an account? Register
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
