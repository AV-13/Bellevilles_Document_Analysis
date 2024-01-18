import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../userContext";

import './header.css';

const Header = () => {

  const [context, setContext] = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      axios.get('http://localhost:3031/user/logout').then((data) => {
        setContext({ userInfo: null, isLoggedIn: false });
        localStorage.clear();
        navigate("/")
      })
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    }
  }

  return (
    <>
      <header>
        <div className="logo">
          <Link to="/">
            <img src="/img/logowescan.png" alt="logowescan" />
          </Link>
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">
                Accueil
              </Link>
            </li>
            {!context.isLoggedIn && <>
              <li>
                <Link to="/login">
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/register">
                  Inscription
                </Link>
              </li>
            </>
            }
            {context.isLoggedIn && <>
              <li>
                <Link to="/tableaudevis" >
                  Historique
                </Link>
              </li>
              <li onClick={() => handleLogout()}>
                <Link to="#" >
                  Déconnexion
                </Link>
              </li>
            </>
            }
          </ul>
        </nav>
      </header>
    </>
  );
};


export default Header;
