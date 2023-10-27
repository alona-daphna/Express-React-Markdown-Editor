import React from 'react';
import ReactMarkdown from 'react-markdown';

const Blockquote = ({ children }) => {
  return <p className="blockquote">{children}</p>;
};

const Code = ({ children }) => {
  return <div>! {children}</div>;
};

const Hr = () => {
  return <hr />;
};

export const Preview = ({ content, isFullScreen }) => {
  return (
    <div
      className="preview"
      style={{ padding: isFullScreen ? '5rem 25rem' : '5rem 2.5rem' }}
    >
      <ReactMarkdown
        components={{ blockquote: Blockquote, code: Code, hr: Hr }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
