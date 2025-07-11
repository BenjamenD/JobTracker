import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../api/axiosInstance.js'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const { data } = await axios.post('/api/auth/login', {email, password});
            //TODO
            if(!data.token) return;
            localStorage.setItem('token', data.token);

            //navigate(redirect);
            navigate("/")
        } catch (error) {
            console.error(`Failed to redirect after login: ${error.message}`);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' value={email} 
                onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>

                <input type='passworod' name='password' value={password} 
                onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

                <input type='submit'/>
            </form>
        </div>
    )
}

export default LoginPage