import React from 'react';
import Style from './modal.module.css';

interface ModalReusableProps {
  children: React.ReactNode;
  isOpens: boolean;
  closeModal: () => void;
}

export const ModalReusable: React.FC<ModalReusableProps> = ({ children, isOpens, closeModal }) => {
  return (
    <article className={`${Style.modal} ${isOpens && Style.isOpen}`}>
      <div className={Style.modalContainer}>
        <button className={Style.modalClose} onClick={closeModal}>X</button>
        {children}
      </div>
    </article>
  );
};

export default ModalReusable;
