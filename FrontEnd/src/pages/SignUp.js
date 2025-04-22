import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WebApp.css';

function SignUp() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleAccountCreation() {
        const users = JSON.parse(localStorage.getItem('users'));
        const passwords = JSON.parse(localStorage.getItem('passwords'));

        if (users.includes(username)) {
            alert('Username already exists!');
        }
        else {
            users.push(username);
            localStorage.setItem('users', JSON.stringify(users));
            passwords.push(password);
            localStorage.setItem('passwords', JSON.stringify(passwords));
            navigate('/TakeMood');
        }
    }

    return (
        <div className="login">
            <h1 className='title'>Strava Ripoff</h1>
            <h3>Create a Strava Ripoff account</h3>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit' onClick={handleAccountCreation}>Create Account</button>
        </div>
    );
}

export default SignUp;
