import React, { useState, useContext } from "react";
import { styles } from "../themes";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import { useUserContext } from "../userContext";


const Header = () => {

  const [ context, setContext ]  = useUserContext();
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
    <header style={localStyles.header}>
      <div style={localStyles.logo}>
        <Link to="/" style={localStyles.logoLink}>
          Mon Logo
        </Link>
      </div>
      <nav style={localStyles.nav}>
        <ul style={localStyles.navList}>
          <li style={localStyles.navItem}>
            <Link to="/" style={localStyles.navLink}>
              Accueil
            </Link>
          </li>
          { !context.isLoggedIn && <>
            <li style={localStyles.navItem}>
              <Link to="/login" style={localStyles.navLink}>
                Connexion
              </Link>
            </li>
            <li style={localStyles.navItem}>
              <Link to="/register" style={localStyles.navLink}>
                Inscription
              </Link>
            </li>
          </>
          }
          <li style={localStyles.navItem}>
            <Link to="/tableaudevis" style={localStyles.navLink}>
              Historique
            </Link>
          </li>

          { context.isLoggedIn && <>
          <li style={localStyles.navItem}>
            <Link to="/profile" style={localStyles.navLink}>
              Profil
            </Link>
          </li>
          <li style={localStyles.navItem} onClick={() => handleLogout()}>
            <Link to="#" style={localStyles.navLink}>
              Profil
            </Link>
          </li>
          </>
          }
        </ul>
      </nav>
    </header>
  );
};

const localStyles = {
  header: {
    backgroundColor: styles.white,
    color: styles.black,
    ...styles.p15,
    ...styles.display,
    ...styles.rowSpaceBetween,
  },
  logo: {
    ...styles.flex,
  },
  logoLink: {
    color: styles.black,
    textDecoration: "none",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nav: {
    textAlign: "right",
    ...styles.flex,
  },
  navList: {
    listStyle: "none",
    ...styles.p0,
	...styles.m0,
    ...styles.display,
  },
  navItem: {
    ...styles.ml15,
  },
  navLink: {
    color: styles.black,
    textDecoration: "none",
  },
};

export default Header;
