// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { styles } from "../themes";
// import Button from "./button";
// import { IoCloudUploadOutline, IoClose } from "react-icons/io5";

// const FileUpload = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);

//   const handleDrop = (acceptedFiles) => {
//     const fileReader = new FileReader();
//     fileReader.onload = (event) => {
//       const imageUrl = event.target.result;
//       setUploadedFiles([...uploadedFiles, { type: "image", data: imageUrl }]);
//     };

//     if (acceptedFiles[0].type === "application/pdf") {
//       // Si le fichier est un PDF, utilisez embed au lieu de l'image
//       const fileUrl = URL.createObjectURL(acceptedFiles[0]);
//       setUploadedFiles([...uploadedFiles, { type: "pdf", data: fileUrl }]);
//     } else {
//       fileReader.readAsDataURL(acceptedFiles[0]);
//     }
//   };

//   const removeFile = (event, index) => {
//     event.stopPropagation();  
//     const updatedFiles = [...uploadedFiles];
//     updatedFiles.splice(index, 1);
//     setUploadedFiles(updatedFiles);
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: handleDrop,
//   });

//   return (
//     <div style={localStyles.fileUploadContainer}>
//       <div {...getRootProps()} style={localStyles.dropzone}>
//         <input {...getInputProps()} />
//         {uploadedFiles.length > 0 ? (
//           <>
//             <Button />
//             <ul style={localStyles.fileList}>
//               {uploadedFiles.map((file, index) => (
//                 <li style={localStyles.li} key={index}>
//                   {file.type === "image" && (
//                     <>
//                       <img
//                         src={file.data}
//                         alt={`Uploaded File ${index}`}
//                         style={localStyles.previewImage}
//                       />
//                       <IoClose
//                         size={20}
//                         style={localStyles.closeButton}
//                         onClick={(event) => removeFile(event, index)}
//                       />
//                     </>
//                   )}
//                   {file.type === "pdf" && (
//                     <>
//                       <embed
//                         src={file.data}
//                         type="application/pdf"
//                         width="100%"
//                         height="100"
//                       />
//                       <IoClose
//                         size={20}
//                         style={localStyles.closeButton}
//                         onClick={(event) => removeFile(event, index)}
//                       />
//                     </>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </>
//         ) : (
//           <>
//             <IoCloudUploadOutline size={100} />
//             <p>Glisser et Déposer vos fichiers ici</p>
//             <p>ou</p>
//             <Button />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const localStyles = {
//   fileUploadContainer: {
//     ...styles.mt20,
//     textAlign: "center",
//     ...styles.display,
//     ...styles.center,
//     color: styles.white,
//   },

//   dropzone: {
//     borderRadius: "20px",
//     ...styles.p20,
//     cursor: "pointer",
//     ...styles.display,
//     ...styles.columnCenter,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     backgroundImage: `
//       linear-gradient(45deg, rgba(0, 0, 0, 0.06) 25%, transparent 0),
//       linear-gradient(-45deg, rgba(0, 0, 0, 0.06) 25%, transparent 0),
//       linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.06) 0),
//       linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.06) 0)
//     `,
//     backgroundSize: "24px 24px",
//     backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
//     width: "50%",
//     height: "500px",
//     boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
//   },
//   fileList: {
//     ...styles.rowCenter, 
//     listStyle: "none",
//     ...styles.p0,
//     ...styles.mt10,
//   },
//   li: {
//     ...styles.mt5,
//     ...styles.fontSizes.f14,
//     position: "relative",
//   },
//   previewImage: {
//     maxWidth: "100%",
//     maxHeight: "100px",
//     margin: "5px",
//   },
//   closeButton: {
//     position: "absolute",
//     top: "5px",
//     right: "5px",
//     cursor: "pointer",
//     color: styles.white,
//   },
// };

// export default FileUpload;