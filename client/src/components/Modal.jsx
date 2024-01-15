import './Modal.css';
import React, { forwardRef, useEffect } from 'react';

const Modal = forwardRef(({ show, children, onClose, modalType }, modalRef) => {
    const handleKeyDown = (event) => {
        if (event.keyCode === 27) { // 27 est le code pour la touche Échap
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // Nettoyage de l'écouteur d'événements lors du démontage du composant
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    const handleBackdropClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
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
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
});


export default Modal;