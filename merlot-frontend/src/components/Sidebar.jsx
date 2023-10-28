import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FILE_NAMES } from '../api';
import { CurrFileContext } from '../context/currFileContext';

export const Sidebar = () => {
  const [files, setFiles] = useState([]);
  const { currFile, setCurrFile } = useContext(CurrFileContext);
  const { refetch } = useQuery(GET_FILE_NAMES, {
    skip: true,
  });

  const handleFileCreated = (e) => {
    const { name } = e.detail;
    setFiles((prev) => [{ name }, ...prev]);
  };

  useEffect(() => {
    window.addEventListener('fileCreated', handleFileCreated);

    const fetchFileNames = async () => {
      const { data } = await refetch();
      setFiles(data.files);
      setCurrFile(data.files[0].id);
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
            onClick={() => setCurrFile(file.id)}
            className={`file ${file.id === currFile ? 'active' : ''}`}
            key={index}
          >
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};
