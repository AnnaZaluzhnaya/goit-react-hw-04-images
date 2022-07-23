import React from 'react';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageUrl } = this.props;
    return createPortal(
      <div className={style.overlay} onClick={this.handleBackdropClick}>
        <div className={style.modal}>
          <img src={largeImageUrl} alt="" width="900" height="600" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  handleBackdropClick: PropTypes.func.isRequired,
};

export default Modal;
