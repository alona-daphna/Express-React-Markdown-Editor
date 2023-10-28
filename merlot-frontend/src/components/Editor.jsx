import React from 'react';

export const Editor = ({ setContent, content }) => {
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
