import React, { useEffect, useState } from 'react';
import axios from 'axios';

import QuotationsTable from './QuotationsTable';


const QuotationsPage = ({groupSelId, groups = [] }) => {


    const [devis, setDevis] = useState([]);
    const [groups, setGroups] = useState();
    const [isLoading, setIsLoading] = useState(false);

    async function fetchDevis() {
        try {
            const response = await axios.get('http://localhost:3031/quotations/getAllQuotations');
        setDevis(response.data);
    } catch(error) {
        console.log("Fetch devis error : ", error);
        return null;
        }
    }

    async function fetchGroups() {
        try {
            const response = await axios.get('http://localhost:3031/groups/getgroups');
            setGroups(response.data);
    } catch(error) {
        console.log("Fetch groups error : ", error);
        return null;
        }
    }

    useEffect( ()=> {
        setIsLoading(true);
        Promise.all([fetchDevis(), fetchGroups()])
        .then(() => {
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            setIsLoading(false);
        });
      },[]);

      if (isLoading) return <p>Ca charge...</p>;

      return (
            <>
                <h2>{group?.groupName}</h2>
                <QuotationsTable quotations={devis} />
            </>
        )
}

export default QuotationsPage