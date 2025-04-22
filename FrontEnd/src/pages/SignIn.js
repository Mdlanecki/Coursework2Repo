import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WebApp.css';

function SignIn() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(['Harry', 'Leo', 'Brandon']));
            localStorage.setItem('passwords', JSON.stringify(['123', 'password', 'react']));
        }
    }, []);

    function handleLogin() {
        const users = JSON.parse(localStorage.getItem('users'));
        const passwords = JSON.parse(localStorage.getItem('passwords'));

        if (users.includes(username) && password === passwords[users.indexOf(username)]) {
            localStorage.setItem('loggedInUser', username);
            navigate("/TakeMood");
        }
        else {
            alert('Incorrect username or password');
        }
    }

    return (
        <div className="login">
            <h1 className='title'>Strava Ripoff</h1>
            <h3>Enter user details</h3>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
            <button type='submit' onClick={handleLogin}>Sign in</button>
            <button type='submit' onClick={navigate("/SignUp")}>Sign up</button>
        </div>
    );
}

export default SignIn;
