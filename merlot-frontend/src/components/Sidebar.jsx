import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FILE_NAMES, deleteFile } from '../api';
import { CurrFileContext } from '../context/currFileContext';

export const Sidebar = () => {
  const [files, setFiles] = useState([]);
  const { currFile, setCurrFile } = useContext(CurrFileContext);
  const { refetch } = useQuery(GET_FILE_NAMES, {
    skip: true,
  });

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
            <span>{file.name}</span>
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
