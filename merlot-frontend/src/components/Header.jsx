import React, { useState } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import { ModeToggle } from './ModeToggle';

export const Header = ({ toggleSidebar, toggleFullView, isFull }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    const body = document.querySelector('body');

    if (!showModal) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  };

  const handleNewFile = () => {
    toggleModal();
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-bg"></div>
          <div className="modal-content">
            <label>File name</label>
            <input type="text" />
            <div className="action">
              <button onClick={toggleModal}>cancel</button>
              <button onClick={handleNewFile}>create</button>
            </div>
          </div>
        </div>
      )}
      <div className="header">
        <div className="left">
          <button
            className="sidebar-toggle"
            onClick={() => toggleSidebar((prev) => !prev)}
          >
            <CgMenuLeft />
          </button>
          <button className="new-file" onClick={toggleModal}>
            +
          </button>
        </div>
        <div className="right">
          <ModeToggle />
          <button onClick={() => toggleFullView((prev) => !prev)}>
            {isFull ? 'Editor' : 'Full'}
          </button>
        </div>
      </div>
    </>
  );
};
