import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';


const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedPathes, setUploadedPathes] = useState([]);
  const [resultPathes, setResultPathes] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);      
    },
  });

 useEffect(()=> {
    if (uploadedPathes?.length) {
      uploadedPathes.map( async path => {
        console.log('teub',path);
        try {
          await axios.post('http://localhost:3031/quotations/analyze',path).then(res => {
            const tempArray = [...resultPathes];
            tempArray.push({file: path, result: true});
            setResultPathes(tempArray);
          })
        }catch(error){
          const tempArray = [... resultPathes];
          tempArray.push({file: path, result: false});
          setResultPathes(tempArray);
          console.error('Error analyzing file', error);
        }
      })
    }
  },[uploadedPathes])

const submit = async () => {

    const formData = new FormData();
      uploadedFiles.map((el) => {
        return formData.append('file', el);
      })

      try {
        await axios.post('http://localhost:3031/upload', formData).then(res => {setUploadedPathes(res.data.files)});
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
export default FileUpload