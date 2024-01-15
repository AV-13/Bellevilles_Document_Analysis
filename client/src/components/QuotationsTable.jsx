import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import { FaMagnifyingGlass } from "react-icons/fa6";
import './QuotationsTable.css';

const QuotationsTable = ({quotations = []}) => {
    
    const [sortedQuotations, setSortedQuotations] = useState(quotations);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState(null);
    const modalRef = useRef();

    useEffect(() => {
        sortData('createdAt');
    }, [quotations]);
    useEffect(() => {
        // Cette fonction vérifie si le clic a eu lieu en dehors de la modal
        const handleClickOutside = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
          }
        };
      
        // Ajouter l'écouteur si la modal est affichée
        if (showModal) {
          document.addEventListener("mousedown", handleClickOutside);
        }
      
        // Nettoyage de l'écouteur
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [showModal]);

    const fileBASEURL = process.env.NODE_ENV === 'development' 
    ? "http://localhost:3031/" 
    : "./";

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
    
        let sortedData;
        if (key === 'groupId') {
            sortedData = [...quotations].sort((a, b) => {
                if (a[key]['groupName'] < b[key]['groupName']) {
                    return direction === 'ascending' ? -1 : 1;
                }
                if (a[key]['groupName'] > b[key]['groupName']) {
                    return direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        } else {
            sortedData = [...quotations].sort((a, b) => {
                if (a[key]['value'] < b[key]['value']) {
                    return direction === 'ascending' ? -1 : 1;
                }
                if (a[key]['value'] > b[key]['value']) {
                    return direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        setSortedQuotations(sortedData);
        setSortConfig({ key, direction });
    };

    
    const displayArrow = (key) => {
        if (sortConfig.key === key) {
            if (sortConfig.direction === 'ascending') {
                return <>&#8593;</>;
            } else {
                return <>&#8595;</>;
            }
        }
    };

    if (!quotations?.length) return <p>Ca charge...</p>;

    const frenchFormattedDate = (newDate) => {
    const dateDate = new Date(newDate);
        return dateDate.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    };


    const generatePreview = (file) => {
        // Construire l'URL complète du fichier
        const fileUrl = `${fileBASEURL}${file}`;
    
        // Vérifier l'extension du fichier pour déterminer son type
        const fileExtension = file.split('.').pop().toLowerCase();
    
        if (fileExtension === 'pdf') {
            // Si le fichier est un PDF, utilisez la balise embed
            return <embed src={fileUrl} type="application/pdf" className="img-container" />;
        } else {
            // Pour les autres types (images), utilisez la balise img
            return <img src={fileUrl} alt="Preview" className="img-container" />;
        }
    };
    const generateUpdateForm = (file) => {
        // Construire l'URL complète du fichier
        const fileUrl = `${fileBASEURL}${file}`;
    
        // Vérifier l'extension du fichier pour déterminer son type
        const fileExtension = file.split('.').pop().toLowerCase();
    
        if (fileExtension === 'pdf') {
            // Si le fichier est un PDF, utilisez la balise embed
            return <embed src={fileUrl} type="application/pdf" className="img-container" />;
        } else {
            // Pour les autres types (images), utilisez la balise img
            return <img src={fileUrl} alt="Preview" className="img-container" />;
        }
    };

    const openModalWithContent = (modalcontent, modalType) => {
        let contenu;
        if (modalType === 'edit') {
            contenu = generateUpdateForm(modalcontent);
        } else if (modalType === 'preview') {
            contenu = generatePreview(modalcontent);
        }
        setContent(contenu);
        setShowModal(true);
    };


    if (!quotations.length) return <p>Pas de devis à afficher</p>;

    return (
        <>
            <table>
                    <thead>
                        <tr>
                        <th onClick={() => sortData('createdAt')}>Date d'upload {displayArrow('createdAt')}</th>
                        <th onClick={() => sortData('quotationNumber')}>Devis # {displayArrow('quotationNumber')}</th>
                        <th onClick={() => sortData('supplier')}>Fournisseur {displayArrow('supplier')}</th>
                        <th onClick={() => sortData('groupId')}>Groupe {displayArrow('groupId')}</th>
                        <th onClick={() => sortData('vatAmount')}>TVA {displayArrow('vatAmount')}</th>
                        <th onClick={() => sortData('totalAmount')}>Total {displayArrow('totalAmount')}</th>
                            <th>Aperçu</th>
                            <th>Editer</th>
                        </tr>
                    </thead>
                    <tbody>

                    {sortedQuotations.map((d,i) => {
                        return (
                            <tr key={`row${i}`}>
                                <td>
                                    {frenchFormattedDate(d.createdAt)}
                                </td>
                                <td className={d.quotationNumber.confidence < 0.85 ? "lowConfidence" : ""}>
                                    {d.quotationNumber?.value ?? "n.c"}
                                </td>
                                <td className={d.supplier.confidence < 0.85 ? "lowConfidence" : ""}>
                                    {d.supplier.value ?? "n.c"}
                                </td>
                                <td>
                                    {d.groupId.groupName}
                                </td>
                                <td className={d.vatAmount.confidence < 0.85 ? "lowConfidence" : ""}>
                                    {d.vatAmount?.value ?? "n.c"}
                                </td>
                                <td className={d.totalAmount.confidence < 0.85 ? "lowConfidence" : ""}>
                                    {d.totalAmount?.value ?? "n.c"}
                                </td>
                                <td>
                                <a onClick={() => openModalWithContent(d.fileUrl, 'preview')}><FaMagnifyingGlass /></a>                            
                                </td>
                                <td>
                                <button className="button" onClick={() => openModalWithContent(d.totalAmount.value, 'edit')}>Editer</button>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
            {showModal && <Modal ref={modalRef} show={showModal} onClose={() => setShowModal(false)}>
                {content}
            </Modal>}
        </>
    )
}

export default QuotationsTable