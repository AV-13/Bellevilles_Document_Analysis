import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext, userContext} from "../App";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import './header.css';

const Header = () => {

  const [context, setContext] = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      axios.get('http://localhost:3031/user/logout').then((data) => {
      setContext({ userInfo : null, isLoggedIn: false });
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
          { !context.isLoggedIn && <>
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
          <li>
            <a href="/tableaudevis">
              {/* TODO LISTE */}
              Historique
            </a>
          </li>

          { context.isLoggedIn && <>
          <li>
            <a href="#">
              {/* TODO LISTE */}
              Profil
            </a>
          </li>
          <li onClick={() => handleLogout()}>
            <a href="#">
              {/* TODO LISTE */}
              Déconnexion
            </a>
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
