import React from 'react';

export const Editor = ({ setContent }) => {
  return (
    <div className="editor">
      <textarea
        onInput={(e) => setContent(e.target.value)}
        placeholder="Say something"
      ></textarea>
    </div>
  );
};
