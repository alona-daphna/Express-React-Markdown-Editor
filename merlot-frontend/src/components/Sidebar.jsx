import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FILE_NAMES, deleteFile, updateFile } from '../api';
import { CurrFileContext } from '../context/currFileContext';

export const Sidebar = () => {
  const [files, setFiles] = useState([]);
  const { currFile, setCurrFile } = useContext(CurrFileContext);
  const { refetch } = useQuery(GET_FILE_NAMES, {
    skip: true,
  });
  let timeout = null;

  const handleDeleteFile = async (id) => {
    const index = files.findIndex((file) => file.id === id);
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    await deleteFile(id);
  };

  const handleFileChanged = (e, id) => {
    setCurrFile(id);
  };

  const handleFileCreated = (e) => {
    const { name, id } = e.detail;
    setFiles((prev) => [{ name, id }, ...prev]);
    setCurrFile(id);
  };

  const handleFileRename = async (title) => {
    console.log(title);
    console.log(currFile);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const response = await updateFile(currFile, {
        name: title,
      });

      if (!response.ok) {
        console.log(await response.json());
      } else {
        console.log('rename');
      }
    }, 500);
  };

  useEffect(() => {
    window.addEventListener('fileCreated', handleFileCreated);

    const fetchFileNames = async () => {
      const { data } = await refetch();
      if (data.files.length) {
        setFiles(data.files);
        setCurrFile(data.files[0].id);
      }
    };

    fetchFileNames();

    return () => {
      window.removeEventListener('fileCreated', handleFileCreated);
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="file-list">
        {files.map((file, index) => (
          <div
            onClick={(e) => handleFileChanged(e, file.id)}
            className={`file ${file.id === currFile ? 'active' : ''}`}
            key={index}
          >
            <span
              onInput={(e) => handleFileRename(e.target.innerHTML)}
              contentEditable={true}
            >
              {file.name}
            </span>
            <span
              onClick={() => handleDeleteFile(file.id)}
              className="delete-file-btn"
            >
              x
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
