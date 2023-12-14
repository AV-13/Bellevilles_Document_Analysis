import React from "react";
import { styles } from "../themes";
import { LuFolderSearch } from "react-icons/lu";
const Button = () => {
  return (
    <div>
      <div style={localStyles.button}>
        Choisir les fichiers{" "}
        <LuFolderSearch size={30} style={localStyles.icons} />
      </div>
    </div>
  );
};

const localStyles = {
  button: {
    color: "rgba(149, 157, 165)",
    background: " rgba(255, 255, 255)",

    ...styles.p30,
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 10,
  },
  icons: {
    ...styles.m10,
  },
};
export default Button;
