import React, { useContext, useEffect, useRef, useState } from 'react';
import { GET_FILE_CONTENT, updateFile } from '../api';
import { CurrFileContext } from '../context/currFileContext';
import { useQuery } from '@apollo/client';

export const Editor = ({ setContent, content }) => {
  const [previousContent, setPreviousContent] = useState(content);
  const { currFile } = useContext(CurrFileContext);
  const { refetch } = useQuery(GET_FILE_CONTENT, {
    skip: true,
    variables: {
      id: 0,
    },
  });

  const handleInputChange = (input) => {
    setContent(input);
  };

  const saveChanges = async (newContent) => {
    setPreviousContent(newContent);
    const response = await updateFile(currFile, {
      content: newContent,
    });

    if (!response.ok) {
      console.log(await response.json());
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await refetch({ id: currFile });
      setContent(data.file.content);
    };

    if (currFile) fetchContent();
  }, [currFile]);

  useEffect(() => {
    const autosave = setTimeout(() => {
      if (content !== previousContent) {
        saveChanges(content);
      }
    }, 500);

    return () => {
      clearTimeout(autosave);
    };
  }, [content]);

  useEffect(() => {
    window.addEventListener('fileCreated', (e) => {
      setContent('');
    });

    return () => {
      window.removeEventListener('fileCreated', (e) => {
        setContent('');
      });
    };
  }, []);

  return (
    <div className="editor">
      <textarea
        onInput={(e) => handleInputChange(e.target.value)}
        value={content}
        placeholder="Say something"
      ></textarea>
    </div>
  );
};
