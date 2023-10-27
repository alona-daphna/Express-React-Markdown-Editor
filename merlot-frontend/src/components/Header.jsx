import React from 'react';
import { CgMenuLeft } from 'react-icons/cg';

export const Header = ({ toggleSidebar, toggleFullView, isFull }) => {
  const handleTheme = () => {
    const currTheme = localStorage.getItem('theme');

    if (!currTheme || currTheme === 'light') {
      document.querySelector('body')?.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.querySelector('body')?.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleNewFile = () => {};

  return (
    <div className="header">
      <div className="left">
        <button
          className="sidebar-toggle"
          onClick={() => toggleSidebar((prev) => !prev)}
        >
          <CgMenuLeft />
        </button>
        <button className="new-file" onClick={handleNewFile}>
          +
        </button>
      </div>
      <div className="right">
        <button onClick={handleTheme}>mode</button>
        <button onClick={() => toggleFullView((prev) => !prev)}>
          {isFull ? 'Editor' : 'Full'}
        </button>
      </div>
    </div>
  );
};
