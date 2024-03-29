import React from "react";
import { styles } from "../themes";

const Body = () => {
  return (
    <div>
      <div style={localStyles.container}>
        <h1 style={localStyles.title}>Comparateur de devis</h1>
        <p>On trouve la meilleure option pour vous en ligne et gratuitement</p>
      </div>
    </div>
  );
};

const localStyles = {
  container: {
    ...styles.display,
    ...styles.columnCenter,
  },
  container2: {},
  title: {
    ...styles.m0,
    fontSize: "2rem",
  },
};

export default Body;
