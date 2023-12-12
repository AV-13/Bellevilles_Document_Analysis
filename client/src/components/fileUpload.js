import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log('Ashley look at me !', acceptedFiles);
      setUploadedFiles(acceptedFiles);      
    },
  });

const submit = async () => {
    const formData = new FormData();
      uploadedFiles.map((el) => {
        return formData.append('file', el);
      })

      try {
        await axios.post('http://localhost:3031/upload', formData);
        console.log('File uploaded successfully');
      } catch (error) {
        console.error('Error uploading file', error);
      }
    };

  return (
    <div>
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop files here or click to browse.</p>
      <ul>
        {uploadedFiles.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </div>
    <button onClick={submit}>Submit</button>
    </div>
  );
};
export default FileUpload;