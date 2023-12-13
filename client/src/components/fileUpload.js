import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';


const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedPathes, setUploadedPathes] = useState([]);
  const [resultPathes, setResultPathes] = useState([]);
  const [inputGroup, setInputGroup] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);      
    },
  });

  async function createGroup(groupName) {
    try {
      const response = await axios.post('http://localhost:3031/groups/create', { groupName });
      return response.data.group;
    } catch(error) {
      console.log("Create Group Error : ", error);
      return null;
    }
  }

  const today = new Date();
  const frenchFormattedDate = today.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  });

 useEffect( ()=> {
    if (uploadedPathes?.length) {
      const groupName = inputGroup ?? `Comparatif du ${frenchFormattedDate}`;

      createGroup(groupName).then(groupId => {
        if (groupId) {
          uploadedPathes.forEach(async path => {
            try {
              await axios.post('http://localhost:3031/quotations/analyze',{filePath: path, groupId: groupId}).then(res => {
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
          });
        }
      });
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