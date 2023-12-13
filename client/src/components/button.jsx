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
    color: styles.white,
    background:
      "linear-gradient(rgba(255, 1, 25), rgba(255, 255, 255, 0.55))",

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
