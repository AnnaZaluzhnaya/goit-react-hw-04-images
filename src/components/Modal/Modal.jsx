import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ largeImageUrl, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className={style.overlay} onClick={handleBackdropClick}>
      <div className={style.modal}>
        <img src={largeImageUrl} alt="" width="900" height="600" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  handleBackdropClick: PropTypes.func,
};

export default Modal;
