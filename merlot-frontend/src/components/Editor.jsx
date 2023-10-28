import React, { useEffect } from 'react';

export const Editor = ({ setContent, content }) => {
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
        onInput={(e) => setContent(e.target.value)}
        value={content}
        placeholder="Say something"
      ></textarea>
    </div>
  );
};
