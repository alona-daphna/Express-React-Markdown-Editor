import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ModeToggle } from '../components/ModeToggle';
import { getPreview } from '../api';

export const PreviewPage = () => {
  const [content, setContent] = useState('');
  const { token } = useParams();

  useEffect(() => {
    const fetchFile = async () => {
      const response = await getPreview(token);

      if (!response.ok) {
        console.log(await response.json());
      } else {
        const { content } = await response.json();
        setContent(content);
      }
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
