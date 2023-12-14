import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3031/user/login', { username, password }).then(res => console.log("response : ", res));
            // Gérer la réponse ici, par exemple redirection ou affichage de message
        } catch (error) {
            // Gérer les erreurs ici
            console.error("error baby", error)
        }
        console.log("Formulaire envoyé au backend");
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe" 
            />
            <button type="submit">Connexion</button>
        </form>
    );
}

export default LoginForm;