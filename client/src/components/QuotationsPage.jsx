import React, { useEffect, useState } from 'react';
import axios from 'axios';

import QuotationsTable from './QuotationsTable';
import Header from './header';
import Body from './body';
import Footer from './footer';

const QuotationsPage = () => {


    const [devis, setDevis] = useState([]);
    const [filteredDevis, setFilteredDevis] = useState([]);
    const [groups, setGroups] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState();

    async function fetchDevis() {
        return axios.get('http://localhost:3031/quotations/getAllQuotations')
            .then(response => {
                setDevis(response.data);
            })
            .catch(error => {
                console.log("Fetch devis error : ", error);
                throw error;
            });
    }

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
        Promise.all([fetchDevis(), fetchGroups()])
        .then(() => {
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
            setIsLoading(false);
        });
      },[]);

    useEffect( ()=> {
        if (selectedGroup && devis) {
            const newArray = devis.filter(d => d.groupId._id === selectedGroup);
            setFilteredDevis(newArray);
        } else {
            setFilteredDevis([... devis]);
        }
      },[selectedGroup, devis]);

      return (
        
            isLoading ? <p>Ca charge...</p>
            : <>
            <Header/>
            <Body/>
                <select name="groups" onChange={(e) => {setSelectedGroup(e.target.value)}} >
                    <option value="" >Sélectionner un groupe</option>
                    {groups?.map((g) => {
                        return(
                            <option value={g._id} key={g._id}>{g.groupName}</option>
                        )
                    }
                    )}
               </select>
                <QuotationsTable quotations={filteredDevis} />
            <Footer/>
            </>
        )
}

export default QuotationsPage