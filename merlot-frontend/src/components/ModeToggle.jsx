import React from 'react';

export const ModeToggle = () => {
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
  return <button onClick={handleTheme}>mode</button>;
};
