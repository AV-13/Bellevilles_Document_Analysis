import React, { useEffect, useState } from 'react';
import axios from 'axios';


const GroupTable = (group) => {


    const [devis, setDevis] = useState([]);

    
    async function fetchDevis(groupId) {
        try {
        const response = await axios.get('http://localhost:3031/quotations/getQuotationsByGroup', { groupId });
        setDevis(response.data);
    } catch(error) {
        console.log("Fetch devis error : ", error);
        return null;
        }
    }

    useEffect( ()=> {
        if (group) {
            fetchDevis(group._id);
        }
      },[group]);

      if (!devis?.length) return <p>Ca charge...</p>;

        return (
            <>
                <h2>{group.groupName}</h2>
                <table>
                    <tbody>
                        {devis.map((d,i) => {
                            return (
                                <tr key={`${d.supplier.value}${i}`}>
                                    <td className={d.quotationNumber.confidence < 0.85 ? "rouge" : ""}>
                                        {d.quotationNumber.value}
                                    </td>
                                    <td>
                                        {d.supplier.value}
                                    </td>
                                    <td>
                                        {d.totalAmount.value}
                                    </td>
                                </tr>

                            )
                        })}
                    </tbody>
                </table>
            </>
        )
}

export default GroupTable