import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { FaMagnifyingGlass, ImCross } from "react-icons/fa6";
import './QuotationsTable.css';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const QuotationsTable = ({quotations = []}) => {
    
    const [sortedQuotations, setSortedQuotations] = useState(quotations);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [modalType, setModalType] = useState(null);
    const [groups, setGroups] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState();
    const formDataRef = useRef({
        quotationNumber: null,
        quotationDate: null,
        supplier: null,
        vatAmount: null,
        totalAmount: null
      });      
    const [showModal, setShowModal] = useState(false);
    const [content, setContent] = useState(null);
    const modalRef = useRef();
    async function fetchGroups() {
        return axios.get('http://localhost:3031/groups/getgroups')
            .then(response => {
                setGroups(response.data);
            })
            .catch(error => {
                console.log("Fetch groups error : ", error);
                throw error;
            });
    }

    useEffect( ()=> {
        setIsLoading(true);
        Promise.all([fetchGroups()])
        .then(() => {
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            setIsLoading(false);
        });
      },[]);

    useEffect(() => {
        sortData('createdAt');
    }, [quotations]);

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
            return <embed src={fileUrl} type="application/pdf" className="img-container-preview" />;
        } else {
            // Pour les autres types (images), utilisez la balise img
            return <img src={fileUrl} alt="Preview" className="img-container-preview" />;
        }
    };

    const generateUpdateForm = (file) => {
        // Construire l'URL complète du fichier
        const fileUrl = `${fileBASEURL}${file.fileUrl}`;
        formDataRef.current = {
            quotationNumber: {value: file.quotationNumber?.value, confidence: file.quotationNumber?.confidence} ?? null,
            quotationDate: {value: file.quotationDate?.value, confidence: file.quotationDate?.confidence } ?? null,
            supplier: {value: file.supplier?.value, confidence: file.supplier?.confidence} ?? null,
            vatAmount: {value: file.vatAmount?.value, confidence: file.vatAmount?.confidence} ?? null,
            totalAmount: {value: file.totalAmount?.value, confidence: file.totalAmount.confidence} ?? null
          };
          const handleInputChange = (e) => {
            // Mettez à jour la valeur de l'input dans formDataRef
            formDataRef.current = {
              ...formDataRef.current,
              [e.target.name]: {value: e.target.value, confidence: 1}
            };
          };
          
          
          const handleSubmit = async (e) => {
            e.preventDefault();
          
            // Utilisez les valeurs de formDataRef pour la soumission
            const updatedFormData = formDataRef.current;
            try {

                const response = await axios.put(`http://localhost:3031/quotations/updateQuotation/${file._id}`, updatedFormData);
                const updatedQuotation = response.data;
                if (updatedQuotation) {
                const updateQuotations = sortedQuotations.map(quotation => {
                    if (quotation._id === updatedQuotation._id) {
                        return updatedQuotation;
                    }
                    return quotation;
                });
                setSortedQuotations(updateQuotations);
                setShowModal(false);
            }


            } catch (error) {
              console.error("Erreur lors de la mise à jour", error);
            }
          };
          
      
        // Vérifier l'extension du fichier pour déterminer son type
        const fileExtension = file.fileUrl.split('.').pop().toLowerCase();

            return ( 
                <>
                { fileExtension === 'pdf' ? <embed src={fileUrl} type="application/pdf" className="img-container-edit" /> : <img src={fileUrl} alt="Preview" className="img-container-edit" /> }
                     
                    <div className='updateQuotationContainer'>
                    <h1>Modification du devis</h1>
                        <form onSubmit={handleSubmit}>
                        <label htmlFor="groupId">Groupe </label>
                        <select defaultValue= {file.groupId._id} name="groups" onChange={(e) => {setSelectedGroup(e.target.value)}} >
                            <option >Sélectionner un groupe</option>
                            {groups?.map((g) => {
                                return(
                                    <option value={g._id} key={g._id}>{g.groupName}</option>
                                )
                            }
                            )}
                        </select>
                            <div>
                                <label htmlFor="quotationNumber">Numéro de devis </label>
                                <input type="text" name="quotationNumber" id="quotationNumber" defaultValue={file.quotationNumber.value}  className={file.quotationNumber.confidence < 0.85 ? "lowConfidence" : ""} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label htmlFor="quotationDate">Date du devis </label>
                                <input type="text" name="quotationDate" id="quotationDate" defaultValue={file.quotationDate.value} className={file.quotationDate.confidence < 0.85 ? "lowConfidence" : ""} onChange={handleInputChange} required />
                            </div>
                            
                            <div>
                                <label htmlFor="supplier">Fournisseur </label>
                                <input type="text" name="supplier" id="supplier" defaultValue={file.supplier.value} className={file.supplier.confidence < 0.85 ? "lowConfidence" : ""} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label htmlFor="TVA">TVA </label>
                                <input type="TVA" name="vatAmount" id="vatAmount" defaultValue={file.vatAmount.value} className={file.vatAmount.confidence < 0.85 ? "lowConfidence" : ""} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label htmlFor="totalAmount">Total </label>
                                <input type="totalAmount" name="totalAmount" id="totalAmount" defaultValue={file.totalAmount.value} className={file.totalAmount.confidence < 0.85 ? "lowConfidence" : ""} onChange={handleInputChange} required />
                            </div>
                            <div className='submitInput'>
                                <input type="submit" value="Modifier" />
                            </div>
                        </form>
                    </div>
                </>
                );
    };

    const openModalWithContent = (modalcontent, type) => {
        let contenu;
        if (type === 'edit') {
            contenu = generateUpdateForm(modalcontent);
        } else if (type === 'preview') {
            contenu = generatePreview(modalcontent);
        }
        setContent(contenu);
        setShowModal(true);
        setModalType(type);
    };

    // Export one quotation

    const handleExport = (key) => {
        const data = sortedQuotations[key];

        const filteredData = [{
            FOURNISSEUR: data.supplier.value,
            IDENTIFIANT: data.quotationNumber.value,
            DATE: data.quotationDate.value,
            TVA: data.vatAmount.value,
            TOTAL: data.totalAmount.value,
        }];

        const fileName = data.supplier.value + data.quotationDate.value;

        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws,'Sheet 1');
        XLSX.writeFile(wb, fileName + '.xlsx');
    }



    if (!quotations.length) return <p>Pas de devis à afficher</p>;

    return (
        <>
            <table>
                    <thead>
                        <tr>
                        <th onClick={() => sortData('createdAt')}>Date d'upload {displayArrow('createdAt')}</th>
                        <th onClick={() => sortData('quotationNumber')}>Devis # {displayArrow('quotationNumber')}</th>
                        <th onClick={() => sortData('quotationDate')}>Date {displayArrow('quotationDate')}</th>
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
                                <td className={d.quotationDate.confidence < 0.85 ? "lowConfidence" : ""}>
                                    {d.quotationDate?.value ?? "n.c"}
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
                                <a style={{cursor: 'pointer'}} onClick={() => openModalWithContent(d.fileUrl, 'preview')}><FaMagnifyingGlass /></a>                            
                                </td>
                                <td>
                                <button className="button" onClick={() => openModalWithContent(d, 'edit')}>Editer</button>
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
            {showModal && <Modal ref={modalRef} show={showModal} modalType={modalType} onClose={() => setShowModal(false)}>
                {content}
            </Modal>}
        </>
    )
}

export default QuotationsTable