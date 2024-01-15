import React, { useEffect, useState } from 'react';
import axios from 'axios';

import QuotationsTable from './QuotationsTable';
import Header from './header';
import Body from './body';
import Footer from './footer';

import * as XLSX from 'xlsx';

const QuotationsPage = () => {


    const [devis, setDevis] = useState([]);
    const [filteredDevis, setFilteredDevis] = useState([]);
    const [groups, setGroups] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState();
    const [selectedGroupName, setSelectedGroupName] = useState('');

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

    const handleExportGroup = () => {

        const filteredData = filteredDevis.map(el => ({
            FOURNISSEUR: el.supplier.value,
            IDENTIFIANT: el.quotationNumber.value,
            DATE: el.quotationDate.value,
            TVA: el.vatAmount.value,
            TOTAL: el.totalAmount.value,

        }));
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws,'Sheet 1');
        XLSX.writeFile(wb, selectedGroupName + '.xlsx');
    }

    const handleChange = (e) => {
        setSelectedGroup(e.target.value);
        const selectedGroupId = e.target.value;
        const selectedGroup = groups.find((g) => g._id === selectedGroupId);

        setSelectedGroupName(selectedGroup ? selectedGroup.groupName : '');
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
                <select name="groups" onChange={(e) => handleChange(e)} >
                    <option value="" >Sélectionner un groupe</option>
                    {groups?.map((g) => {
                        return(
                            <option value={g._id} key={g._id}>{g.groupName}</option>
                        )
                    }
                    )}
               </select>
               <button onClick={() => handleExportGroup()}>Export donnée du groupe</button>
               <QuotationsTable quotations={filteredDevis} />
            <Footer/>
            </>
        )
}

export default QuotationsPage