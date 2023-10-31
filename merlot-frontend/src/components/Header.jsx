import React, { useContext, useRef, useState } from 'react';
import { CgMenuLeft } from 'react-icons/cg';
import { ModeToggle } from './ModeToggle';
import { createFile, generatePreviewToken } from '../api';
import { CurrFileContext } from '../context/currFileContext';
import { useNavigate } from 'react-router-dom';

export const Header = ({ toggleSidebar, toggleFullView, isFull }) => {
  const [showModal, setShowModal] = useState(false);
  const fileName = useRef(null);
  const { currFile, setCurrFile } = useContext(CurrFileContext);
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
    const body = document.querySelector('body');

    if (!showModal) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  };

  const handleNewFile = async () => {
    const response = await createFile({
      name: fileName.current.value,
      content: '',
    });

    if (!response.ok) {
      console.log(await response.json());
    } else {
      const file = await response.json();
      setCurrFile(file.id);
      window.dispatchEvent(
        new CustomEvent('fileCreated', {
          detail: { name: file.name, id: file.id },
        })
      );
      toggleModal();
    }
  };

  const handleShare = async () => {
    const response = await generatePreviewToken(currFile);

    if (!response.ok) {
      console.log(await response.json());
    } else {
      const { token } = await response.json();
      navigate(`/preview/${token}`);
    }
  };

  const handleKeyPress = (key) => {
    if (key == 'Enter') {
      handleNewFile();
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay" onKeyDown={(e) => handleKeyPress(e.key)}>
          <div className="modal-bg"></div>
          <div className="modal-content">
            <label>File name</label>
            <input autoFocus ref={fileName} type="text" />
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
          <button onClick={handleShare}>Share</button>
          <button onClick={() => toggleFullView((prev) => !prev)}>
            {isFull ? 'Editor' : 'Full'}
          </button>
        </div>
      </div>
    </>
  );
};
