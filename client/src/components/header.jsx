import React from "react";
import { styles } from "../themes";
import { Link } from "react-router-dom";

const Header = () => {
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
          <li style={localStyles.navItem}>
            <a href="#" style={localStyles.navLink}>
              Contact
            </a>
          </li>
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
