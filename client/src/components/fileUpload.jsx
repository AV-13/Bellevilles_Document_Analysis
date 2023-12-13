import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { styles } from "../themes";
import Button from "./button";
const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log("Ashley look at me !", acceptedFiles);
      setUploadedFiles(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });
  return (
    <div style={localStyles.fileUploadContainer}>
      <div {...getRootProps()} style={localStyles.dropzone}>
        <input {...getInputProps()} />
        <Button/>
      <ul style={localStyles.fileList}>
        {uploadedFiles.map((file) => (
          <li style={localStyles.li} key={file.name}>
            {file.name}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

const localStyles = {
  fileUploadContainer: {
    ...styles.mt20,
    textAlign: "center",
  },
  dropzone: {
    border: "2px dashed  #3498db",
    backgroundColor: styles.linearColor3,
    borderRadius: "4px",
    ...styles.p20,
    cursor: "pointer",
  },
  fileList: {
    listStyle: "none",
    ...styles.p0,
    ...styles.mt10,
  },
  li: {
    ...styles.mt5,
    ...styles.fontSizes.f14,
  },
};

export default FileUpload;
