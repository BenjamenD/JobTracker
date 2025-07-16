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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col">
            <form 
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full border px-3 py-2 rounded"
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
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 border rounded bg-gray-200 hover:bg-gray-300"
                >
                    Login
                </button>
            </form>

            {errorMsg && <div className='text-red-800 mb-2 mt-5 text-center'>{errorMsg}</div>}

            <div className="text-center w-full mt-10">
                <button
                    onClick={() => navigate('/register')}
                    className="text-sm text-blue-500 hover:text-blue-700"
                >
                    Dont have an account? Register
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
