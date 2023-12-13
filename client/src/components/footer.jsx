import React from "react";
import {styles} from "../themes"
const Footer = () => {
  return (
    <footer style={localStyles.footer}>
      <div style={localStyles.footerContent}>
        <div style={localStyles.footerSection}>
          <h3 style={localStyles.footerHeading}>À propos de nous</h3>
          <p style={localStyles.footerText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget
            justo sed sem luctus facilisis.
          </p>
        </div>
        <div style={localStyles.footerSection}>
          <h3 style={localStyles.footerHeading}>Liens utiles</h3>
          <ul style={localStyles.footerList}>
            <li>
              <a href="#" style={localStyles.footerLink}>
                Accueil
              </a>
            </li>
            <li>
              <a href="#" style={localStyles.footerLink}>
                Services
              </a>
            </li>
            <li>
              <a href="#" style={localStyles.footerLink}>
                À propos
              </a>
            </li>
            <li>
              <a href="#" style={localStyles.footerLink}>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div style={localStyles.footerSection}>
          <h3 style={localStyles.footerHeading}>Contactez-nous</h3>
          <p style={localStyles.footerText}>contact@example.com</p>
        </div>
      </div>
    </footer>
  );
};

const localStyles = {
  footer: {
    backgroundColor: styles.grayScale8,
    color: styles.grayScale5,
    ...styles.p20,
    ...styles.mt50,
  },
  footerContent: {
    ...styles.display,
    ...styles.justifyAround,
    ...styles.wrap,
    ...styles.selfStart,
  },
  footerSection: {
    flexBasis: "30%",
    ...styles.mb50,
  },
  footerHeading: {
    fontSize: "1.5rem",
    ...styles.mb10,
  },
  footerText: {
    fontSize: "1rem",
    lineHeight: "1.5",
  },
  footerList: {
    listStyle: "none",
    ...styles.p0,
    ...styles.m0,
  },
  footerLink: {
    color: styles.grayScale5,
    textDecoration: "none",
    fontSize: "1rem",
    lineHeight: "1.5",
  },
};

export default Footer;
