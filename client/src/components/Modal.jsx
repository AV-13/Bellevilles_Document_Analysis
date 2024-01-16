import './Modal.css';
import React, { forwardRef, useEffect } from 'react';
import { ImCross } from "react-icons/im";

const Modal = forwardRef(({ show, children, onClose, modalType }, modalRef) => {
    const handleKeyDown = (event) => {
        if (event.keyCode === 27) { // 27 est le code pour la touche Échap
            onClose();
        }
    };

    useEffect(() => { 
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    const handleBackdropClick = (event) => {
        if (modalRef?.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal" ref={modalRef}>
                {children}
                
            </div>
            {modalType === "edit" && <ImCross className="closeCross" onClick={onClose} />}
        </div>
    );
});


export default Modal;