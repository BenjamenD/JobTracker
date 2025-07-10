import React, { useState } from 'react'

const LoginPage = ({ redirect }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault()
        const { data } = await axios.post('/api/auth/login', {username, password});
        //TODO
        if(!data.token) exit(1);
        localStorage.setItem('token', data.token);

        //redirect to requested page, or homepage if none requested?

    }


  return (
    <div>

    </div>
  )
}

export default LoginPage