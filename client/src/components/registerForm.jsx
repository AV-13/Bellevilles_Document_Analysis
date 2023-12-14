import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
          console.log("form data :", formData);
          await axios.post('http://localhost:3031/user/register', formData , {
            headers: {
                'Content-Type': 'multipart/form-data',
            }}).then(res => console.log("response : ", res));
            
        } catch (error) {
          console.error("error baby", error)
            // Gérer les erreurs ici
        }
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
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email" 
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe" 
            />
            <input 
                type="file" 
                onChange={(e) => setAvatar(e.target.files[0])}
            />
            <button type="submit">S'inscrire</button>
        </form>
    );
}

export default RegisterForm;