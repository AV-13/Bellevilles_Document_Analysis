import React from "react";
import { styles } from "../themes";
import FileUpload from "./fileUpload";

const Body = () => {
  return (
    <div>
      <div style={localStyles.container}>
        <h1 style={localStyles.title}>Comparateur de devis</h1>
        <p>On trouve la meilleur option pour vous en ligne et gratuitement</p>
      </div>
        <FileUpload />
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
    color: styles.alertColor,
  },
};

export default Body;
