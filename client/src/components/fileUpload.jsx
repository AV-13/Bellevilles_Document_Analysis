import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { styles } from "../themes";
import Button from "./buttonSelectFile";
import { IoCloudUploadOutline, IoClose } from "react-icons/io5";
import ButtonSubmit from "./buttonSubmit";

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [resultPathes, setResultPathes] = useState([]);
  const [inputGroup, setInputGroup] = useState();

  const navigate = useNavigate();

  async function createGroup(groupName) {
    try {
      const response = await axios.post("http://localhost:3031/groups/create", {
        groupName,
      });
      return response.data.group;
    } catch (error) {
      console.log("Create Group Error : ", error);
      return null;
    }
  }

  const handleDrop = (acceptedFiles) => {
    const newUploadedFiles = acceptedFiles.map(file => {
      if (file.type === "application/pdf") {
        return { type: "pdf", data: URL.createObjectURL(file), file };
      } else {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          setUploadedFiles(prev => [...prev, { type: "image", data: event.target.result, file }]);
        };
        fileReader.onerror = (error) => {
          console.error("Error reading file:", error);
        };
        fileReader.readAsDataURL(file);
      }
    });
    setUploadedFiles(prev => [...prev, ...newUploadedFiles.filter(f => f)]);
  };
  

  const removeFile = (event, index) => {
    event.stopPropagation();
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  const today = new Date();
  const frenchFormattedDate = today.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  async function processUploadedFiles(uploadedPathes) {
    if (uploadedPathes?.length) {
      const groupName = inputGroup ?? `Comparatif du ${frenchFormattedDate}`;
  
      try {
        const groupId = await createGroup(groupName);
        if (groupId) {
          const analyzePromises = uploadedPathes.map(async (path) => {
            try {
              const res = await axios.post("http://localhost:3031/quotations/analyze", {
                filePath: path,
                groupId: groupId,
              });
              const tempArray = [...resultPathes];
              tempArray.push({ file: path, result: true });
              setResultPathes(tempArray);
            } catch (error) {
              const tempArray = [...resultPathes];
              tempArray.push({ file: path, result: false });
              setResultPathes(tempArray);
              console.error("Error analyzing file", error);
            }
          });
  
          await Promise.all(analyzePromises);
  
          setUploadedFiles([]);
          navigate("/tableaudevis");
        }
      } catch (error) {
        console.error("Error in creating group:", error);
      }
    }
  } 

  const submit = async () => {
    const formData = new FormData();
    uploadedFiles.forEach(({ file }) => {
      if (file) {
        formData.append("file", file);
      }
    });

    if (uploadedFiles?.length) {
      try {
        await axios
          .post("http://localhost:3031/upload", formData)
          .then((res) => {
            console.log("Files uploaded successfully");
            return processUploadedFiles(res.data.files);
          });
      } catch (error) {
        console.error("Error uploading file", error);
      }
    }
  };

  return (
    <div style={localStyles.fileUploadContainer}>
      <div {...getRootProps()} style={localStyles.dropzone}>
        <input {...getInputProps()} />
        {uploadedFiles.length > 0 ? (
          <>
            <Button />
            <ul style={localStyles.fileList}>
              {uploadedFiles.map((file, index) => (
                <li style={localStyles.li} key={index}>
                  {file.type === "image" && (
                    <>
                      <img
                        src={file.data + "#page=1"}
                        alt={`Uploaded File ${index}`}
                        style={localStyles.previewImage}
                      />
                      <IoClose
                        size={20}
                        style={localStyles.closeButton}
                        onClick={(event) => removeFile(event, index)}
                      />
                    </>
                  )}
                  {file.type === "pdf" && (
                    <>
                      <embed
                        src={file.data}
                        type="application/pdf"
                        style={localStyles.previewPdf}
                      />
                      <IoClose
                        size={20}
                        style={localStyles.closeButton}
                        onClick={(event) => removeFile(event, index)}
                      />
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <IoCloudUploadOutline size={100} />
            <p>Glisser et Déposer vos fichiers ici</p>
            <p>ou</p>
            <Button />
          </>
        )}
      </div>
      <ButtonSubmit submit={submit} />
    </div>
  );
};

const localStyles = {
  fileUploadContainer: {
    ...styles.mt20,
    textAlign: "center",
    ...styles.display,
    ...styles.columnCenter,
    color: styles.white,
  },

  dropzone: {
    borderRadius: "20px",
    ...styles.p20,
    cursor: "pointer",
    ...styles.display,
    ...styles.columnCenter,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundImage: `
        linear-gradient(45deg, rgba(0, 0, 0, 0.06) 25%, transparent 0),
        linear-gradient(-45deg, rgba(0, 0, 0, 0.06) 25%, transparent 0),
        linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.06) 0),
        linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.06) 0)
      `,
    backgroundSize: "24px 24px",
    backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
    width: "50%",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  fileList: {
    ...styles.display,
    ...styles.rowCenter,
    listStyle: "none",
    ...styles.p0,
    ...styles.mt10,
    flexWrap: "wrap",
  },
  li: {
    ...styles.mt5,
    ...styles.fontSizes.f14,
    position: "relative",
  },
  previewImage: {
    width: 135,
    height: 190,
    margin: "5px",
  },
  previewPdf: {
    width: 135,
    height: 190,
    margin: "5px",
  },
  closeButton: {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    color: styles.redColor,
  },
};

export default FileUpload;
