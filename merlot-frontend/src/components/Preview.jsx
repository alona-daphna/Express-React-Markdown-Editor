import React, { useContext, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { CurrFileContext } from '../context/currFileContext';
import { useQuery } from '@apollo/client';
import { GET_FILE_CONTENT } from '../api';

const Blockquote = ({ children }) => {
  return <p className="blockquote">{children}</p>;
};

const Code = ({ children }) => {
  return <div>! {children}</div>;
};

const Hr = () => {
  return <hr />;
};

const Br = () => {
  return <br />;
};

export const Preview = ({ content, isFullScreen, setContent }) => {
  const { currFile } = useContext(CurrFileContext);
  const { refetch } = useQuery(GET_FILE_CONTENT, {
    skip: true,
    variables: {
      id: 0,
    },
  });

  // useEffect(() => {
  //   setContent((prev) => prev.replace(/\n/gi, '\n &nbsp;'));
  // }, [content]);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await refetch({ id: currFile });
      setContent(data.file.content);
    };

    if (currFile) fetchContent();
  }, [currFile]);
  return (
    <div
      className="preview"
      style={{
        maxWidth: isFullScreen ? '740px' : '',
        padding: isFullScreen ? '5rem 0' : '4rem 2rem',
      }}
    >
      <ReactMarkdown
        components={{ blockquote: Blockquote, code: Code, hr: Hr, br: Br }}
      >
        {/* {content.replace(/\n/gi, '\n &nbsp;')} */}
        {content}
      </ReactMarkdown>
    </div>
  );
};
