import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_FILE_CONTENT } from '../api';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ModeToggle } from '../components/ModeToggle';

export const PreviewPage = () => {
  const [content, setContent] = useState('');
  const { id } = useParams();
  const { refetch } = useQuery(GET_FILE_CONTENT, {
    skip: true,
    variables: {
      id: 0,
    },
  });

  useEffect(() => {
    const fetchFile = async () => {
      const { data } = await refetch({ id });
      setContent(data.file.content);
    };

    fetchFile();
  }, []);

  return (
    <>
      <div className="mode-wrapper">
        <ModeToggle />
      </div>
      <div className="preview-page">
        <div className="preview">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};
