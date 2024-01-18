import React from "react";
import { styles } from "../themes";
import { LuFolderSearch } from "react-icons/lu";
import "./buttonSelectFile.css"

const ButtonFile = () => {
  return (
    <div >
      <div className="buttonSelectFile">
        Choisir les fichiers{" "}
        <LuFolderSearch size={30} style={localStyles.icons} />
      </div>
    </div>
  );
};

const localStyles = {
  icons: {
    ...styles.m10,
  },
};
export default ButtonFile;
