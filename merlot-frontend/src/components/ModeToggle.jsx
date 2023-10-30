import React from 'react';

export const ModeToggle = () => {
  const handleTheme = () => {
    const currTheme = localStorage.getItem('theme');

    if (!currTheme || currTheme === 'dark') {
      document.querySelector('body')?.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.querySelector('body')?.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  };
  return <button onClick={handleTheme}>mode</button>;
};
