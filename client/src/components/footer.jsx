import React from "react";
import {styles} from "../themes"
const Footer = () => {
  return (
    <footer style={localStyles.footer}>
      <div style={localStyles.footerContent}>
        <div style={localStyles.footerSection}>
          <h3 style={localStyles.footerHeading}>À propos de nous</h3>
          <p style={localStyles.footerText}>
            Une appli réalisée pour Bellevilles par Alexandre, Augustin, Clément, Jairo, Nassim
          </p>
        </div>
        <div style={localStyles.footerSection}>
          <h3 style={localStyles.footerHeading}>Contactez-nous</h3>
          <p style={localStyles.footerText}>bellevilles.ai@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

const localStyles = {
  footer: {
    backgroundColor: styles.grayScale8,
    color: styles.grayScale5,
    ...styles.mt50,
    height: 'fit-content',
  },
  footerContent: {
    ...styles.display,
    ...styles.justifyAround,
    ...styles.wrap,
    ...styles.selfStart,
  },
  footerSection: {
    flexBasis: "30%",
    ...styles.mb20,
  },
  footerHeading: {
    fontSize: "1rem",
    ...styles.mb10,
  },
  footerText: {
    fontSize: "0.8rem",
    lineHeight: "1",
  },
  footerList: {
    listStyle: "none",
    ...styles.p0,
    ...styles.m0,
  },
};

export default Footer;
