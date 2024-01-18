import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';
import "./QuotationsTable.css";
import "./loginRegister.css";
import "./form.css";
function LoginForm() {
    const [context, setContext] = useContext(UserContext);

    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            axios.post('http://localhost:3031/user/login', { username, password }, { withCredentials: true }).then((data) => {
            setContext({ uesrInfo: data, isLoggedIn: true });
            navigate("/")
            })
        } catch (error) {
            console.error("Erreur lors de la connexion : ", error);
        }
    };

    return (
        <div className="container">
        <form className="login-register-form" onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                    name='username'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nom d'utilisateur"
                />
            <label htmlFor='password'>Password</label>
            <input 
                name='password'
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe" 
            />
                <button className="button login-button" type="submit">Connexion</button>
        </form>
    </div>
    );
}

export default LoginForm;
