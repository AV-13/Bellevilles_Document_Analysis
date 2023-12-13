import React from "react";
import { styles } from "../themes";

const Header = () => {
  return (
    <header style={localStyles.header}>
      <div style={localStyles.logo}>
        <a href="#" style={localStyles.logoLink}>
          Mon Logo
        </a>
      </div>
      <nav style={localStyles.nav}>
        <ul style={localStyles.navList}>
          <li style={localStyles.navItem}>
            <a href="#" style={localStyles.navLink}>
              Accueil
            </a>
          </li>
          <li style={localStyles.navItem}>
            <a href="#" style={localStyles.navLink}>
              Services
            </a>
          </li>
          <li style={localStyles.navItem}>
            <a href="#" style={localStyles.navLink}>
              À propos
            </a>
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
