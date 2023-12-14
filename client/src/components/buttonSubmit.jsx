import React from "react";
import { styles } from "../themes";
const ButtonSubmit = ({ submit }) => {
  return (
    <div onClick={submit}>
      <div style={localStyles.button}>Envoyer</div>
    </div>
  );
};

const localStyles = {
  button: {
    color: "rgba(255, 255, 255)",
    background: "#8EA604",
    ...styles.p20,
    ...styles.m20,
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 10,
    cursor: "pointer",
  },
};
export default ButtonSubmit;
