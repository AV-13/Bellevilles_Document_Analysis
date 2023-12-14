import React, { useState } from 'react';

import './QuotationsTable.css';

const QuotationsTable = ({quotations = []}) => {
    
    const [sortedQuotations, setSortedQuotations] = useState(quotations);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const sortData = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedData = [...quotations].sort((a, b) => {
            if (a[key]['value'] < b[key]['value']) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key]['value'] > b[key]['value']) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setSortedQuotations(sortedData);
        setSortConfig({ key, direction });
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

    if (!quotations.length) return <p>Pas de devis à afficher</p>;
console.log(sortedQuotations)
    return (
        <>
            <table>
                    <thead>
                        <tr>
                        <th onClick={() => sortData('createdAt')}>Date d'upload</th>
                        <th onClick={() => sortData('quotationNumber')}>Devis #</th>
                        <th onClick={() => sortData('supplier')}>Fournisseur</th>
                        <th onClick={() => sortData('groupId')}>Groupe</th>
                        <th onClick={() => sortData('vatAmount')}>TVA</th>
                        <th onClick={() => sortData('totalAmount')}>Total</th>
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
                                    <embed
                                        src={'./' + d.fileUrl.replace(/\\/g, '/')}
                                        type="application/pdf"
                                        width="100%"
                                        height="100"
                                    />
                                </td>
                                <td>
                                    Editer
                                </td>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default QuotationsTable