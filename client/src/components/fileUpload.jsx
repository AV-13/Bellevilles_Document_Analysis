import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { styles } from "../themes";
import ButtonFile from "./buttonSelectFile";
import { IoCloudUploadOutline, IoClose } from "react-icons/io5";
import ButtonSubmit from "./buttonSubmit";
import Modal from "./Modal";

import "./fileUpload.css";

const FileUpload = () => {
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [resultPathes, setResultPathes] = useState([]);
  const [inputGroup, setInputGroup] = useState();
  const [showButton, setShowButton] = useState(false);
  const [groups, setGroups] = useState();
  const [isLoading, setIsLoading] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState();

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
    if (errorMessage && filesToUpload.length + acceptedFiles.length <= 10) {
      setErrorMessage("");
    }
    if (filesToUpload.length + acceptedFiles.length > 10) {
      setErrorMessage(
        "Vous ne pouvez sélectionner que 10 fichiers au maximum."
      );
      return;
    }
    const newUploadedFiles = acceptedFiles.slice(0, 10).map((file) => {
      if (file.type === "application/pdf") {
        return { type: "pdf", data: URL.createObjectURL(file), file };
      } else {
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          setFilesToUpload((prev) => [
            ...prev,
            { type: "image", data: event.target.result, file },
          ]);
        };
        fileReader.onerror = (error) => {
          console.error("Error reading file:", error);
        };
        fileReader.readAsDataURL(file);
      }
    });
    setFilesToUpload((prev) => [...prev, ...newUploadedFiles.filter((f) => f)]);
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

  async function fetchGroups() {
    return axios
      .get("http://localhost:3031/groups/getgroups")
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.log("Fetch groups error : ", error);
        throw error;
      });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchGroups()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  const inputGroupSection = !isLoading && (
    <div className="groupSection">
      {!inputGroup && (
        <>
          <div className="section-1">
            <p>Sélectionner un groupe existant :</p>
            <select
              name="groups"
              onChange={(e) => {
                setSelectedGroup(e.target.value);
              }}
            >
              <option value="">Sélectionner un groupe</option>
              {groups?.map((g) => {
                return (
                  <option value={g._id} key={g._id}>
                    {g.groupName}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}
      {!inputGroup && !selectedGroup && <>ou</>}
      {(!selectedGroup || !selectedGroup?.length) && (
        <>
          <div className="section-2">
            <p>Créez en un nouveau :</p>
            <input
              type="text"
              onChange={(e) => setInputGroup(e.target.value)}
            ></input>
          </div>
        </>
      )}
    </div>
  );

  async function processUploadedFiles(uploadedPathes) {
    if (uploadedPathes?.length) {
      if (selectedGroup?.length) {
        try {
          const groupId = selectedGroup;
          if (groupId) {
            const analyzePromises = uploadedPathes.map(async (path) => {
              try {
                const res = await axios.post(
                  "http://localhost:3031/quotations/analyze",
                  {
                    filePath: path,
                    groupId: groupId,
                  }
                );
                setResultPathes((prevPathes) => [
                  ...prevPathes,
                  { file: path, result: true },
                ]);
              } catch (error) {
                setResultPathes((prevPathes) => [
                  ...prevPathes,
                  { file: path, result: false },
                ]);
                console.error("Error analyzing file", error);
              }
            });
            await Promise.all(analyzePromises);
            setShowButton(true);
          }
        } catch (error) {
          console.error("Error in creating group:", error);
        }
      } else {
        const groupName = inputGroup ?? `Comparatif du ${frenchFormattedDate}`;
        try {
          const groupId = await createGroup(groupName);
          if (groupId) {
            const analyzePromises = uploadedPathes.map(async (path) => {
              try {
                const res = await axios.post(
                  "http://localhost:3031/quotations/analyze",
                  {
                    filePath: path,
                    groupId: groupId,
                  }
                );
                setResultPathes((prevPathes) => [
                  ...prevPathes,
                  { file: path, result: true },
                ]);
              } catch (error) {
                setResultPathes((prevPathes) => [
                  ...prevPathes,
                  { file: path, result: false },
                ]);
                console.error("Error analyzing file", error);
              }
            });
            await Promise.all(analyzePromises);
            setShowButton(true);
          }
        } catch (error) {
          console.error("Error in creating group:", error);
        }
      }
    }
  }

  const submit = async () => {
    setShowModal(true);
    const formData = new FormData();
    filesToUpload.forEach(({ file }) => {
      if (file) {
        formData.append("file", file);
      }
    });

    if (filesToUpload?.length) {
      try {
        await axios
          .post("http://localhost:3031/upload", formData)
          .then((res) => {
            console.log("Files uploaded successfully");
            setUploadedFiles(res.data.files);
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
        {filesToUpload.length > 0 ? (
          <>
            <ButtonFile />
            <ul style={localStyles.fileList}>
              {filesToUpload.map((file, index) => (
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
                        onClick={(event) => {
                          event.stopPropagation();
                          setFilesToUpload((prev) => {
                            const updatedFiles = prev.filter((f) => f !== file);

                            if (updatedFiles.length <= 10) {
                              setErrorMessage("");
                            }

                            return updatedFiles;
                          });
                        }}
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
                        onClick={(event) => {
                          event.stopPropagation();
                          setFilesToUpload((prev) => {
                            const updatedFiles = prev.filter((f) => f !== file);

                            if (updatedFiles.length <= 10) {
                              setErrorMessage("");
                            }

                            return updatedFiles;
                          });
                        }}
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
            <ButtonFile />
          </>
        )}
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {inputGroupSection}
      {filesToUpload?.length && <ButtonSubmit submit={submit} />}
      {showModal && (
        <Modal
          show={showModal}
          onClose={(e) => {
            if (!showButton) {
              e.stopPropagation();
              return;
            }
            setFilesToUpload([]);
            setUploadedFiles([]);
            setShowModal(false);
          }}
        >
          <div>
            <table className="tableFileUpload">
              <thead>
                <th>Nom</th>
                <th>Upload</th>
                <th>Analyze</th>
              </thead>
              {filesToUpload?.map((f, i) => {
                return (
                  <tr key={`rown${i}`}>
                    <td>{f.file.path}</td>
                    <td>
                      {uploadedFiles.some((fi) => fi.includes(f.file.path))
                        ? "OK"
                        : "ERREUR"}
                    </td>
                    <td>
                      {!resultPathes.some((fi) => fi.file.includes(f.file.path))
                        ? "pending"
                        : resultPathes.find((fi) =>
                            fi.file.includes(f.file.path)
                          )?.result
                        ? "OK"
                        : "ERREUR"}
                    </td>
                  </tr>
                );
              })}
            </table>
            {showButton && (
              <a
                className="nextbutton"
                onClick={() => navigate("/tableaudevis")}
              >
                OK
              </a>
            )}
          </div>
        </Modal>
      )}
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
