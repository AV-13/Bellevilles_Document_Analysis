import React, { useEffect, useState } from 'react';
import axios from 'axios';

import QuotationsTable from './QuotationsTable';
import LoadingScreen from './loadingScreen';


const GroupTable = ({groupSelId, groups = [] }) => {


    const [devis, setDevis] = useState([]);
    const [group, setGroup] = useState();
    
    async function fetchDevis(groupId) {
        try {
            const response = await axios.get('http://localhost:3031/quotations/getQuotationsByGroup', { 
                params: { groupId: groupId }
            });
        setDevis(response.data);
    } catch(error) {
        console.log("Fetch devis error : ", error);
        return null;
        }
    }

    useEffect( ()=> {
        if (groupSelId && groups?.length) {
            const selectedGroup =  groups.filter(g => g._id === groupSelId);

            fetchDevis(selectedGroup[0]._id);
            setGroup(selectedGroup);
        } else {
            console.log("ça marche pas chef ! ");
        }
      },[groupSelId, groups]);

      if (!devis?.length) return <LoadingScreen />;

      return (
            <>
                <h2>{group?.groupName}</h2>
                <QuotationsTable quotations={devis} />
            </>
        )
}

export default GroupTable