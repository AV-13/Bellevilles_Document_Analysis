import React, { useEffect, useState } from 'react';
import axios from 'axios';

import QuotationsTable from './QuotationsTable';
import Header from './header';
import Footer from './footer';

import * as XLSX from 'xlsx';
import './QuotationsPage.css';
import LoadingScreen from './loadingScreen';

const QuotationsPage = () => {


    const [devis, setDevis] = useState([]);
    const [filteredDevis, setFilteredDevis] = useState([]);
    const [groups, setGroups] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState();
    const [selectedGroupName, setSelectedGroupName] = useState('');
    const [search, setSearch] = useState('');

    async function fetchDevis() {
        return axios.get('http://localhost:3031/quotations/getAllQuotations')
            .then(response => {
                setDevis(response.data);
            })
            .catch(error => {
                console.error("Fetch devis error : ", error);
                throw error;
            });
    }

    async function fetchGroups() {
        return axios.get('http://localhost:3031/groups/getgroups')
            .then(response => {
                setGroups(response.data);
            })
            .catch(error => {
                console.error("Fetch groups error : ", error);
                throw error;
            });
    }

    const handleExportGroup = () => {


        const filteredData = filteredDevis.map(el => {
            const date = new Date(el.createdAt);

            const jour = date.getDate().toString().padStart(2, '0');
            const mois = (date.getMonth() + 1).toString().padStart(2, '0'); 
            const annee = date.getFullYear();
          
            const dateFormatee = `${jour}/${mois}/${annee}`;

            return {
            DATE_UPLOAD : dateFormatee,
            FOURNISSEUR: el.supplier.value,
            IDENTIFIANT: el.quotationNumber.value,
            DATE: el.quotationDate.value,
            TVA: el.vatAmount.value,
            TOTAL: el.totalAmount.value,
            }
        });
        let fileName = 'exportDevis'
        if(selectedGroupName) {
            fileName = selectedGroupName;
        }
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws,'Sheet 1');
        XLSX.writeFile(wb, fileName + '.xlsx');
    }

    const handleChange = (e) => {
        setSelectedGroup(e.target.value);
        const selectedGroupId = e.target.value;
        const selectedGroup = groups.find((g) => g._id === selectedGroupId);

        setSelectedGroupName(selectedGroup ? selectedGroup.groupName : '');
    }

    useEffect(() => {
        setIsLoading(true);
        Promise.all([fetchDevis(), fetchGroups()])
            .then(() => {
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (devis) {
            const newArray = devis.filter(d => (!selectedGroup || d.groupId._id === selectedGroup) && (!search || d.supplier?.value?.toLowerCase().includes(search.toLowerCase()) || d.quotationNumber?.value?.toLowerCase().includes(search.toLowerCase()) || d.groupId?.groupName?.toLowerCase().includes(search.toLowerCase())));
            setFilteredDevis(newArray);
        } else {
            setFilteredDevis([...devis]);
        }
    }, [selectedGroup, devis, search]);

    return (

        isLoading ? <LoadingScreen />
            : <>
                <Header />
                <div style={{ marginTop: '5em' }}></div>
                <div className='container'>
                    <div className="groupsection">
                        <div className="searchAndSelectSection">
                            <div className="searchSection">
                                <i className="material-icons">search</i><input type="text" placeholder='Rechercher....' onChange={(e) => setSearch(e.target.value)} />
                            </div>
                            <select className="selectSection" name="groups" onChange={(e) => handleChange(e)} style={{marginLeft: '1em'}} >
                                <option value="" >Sélectionner un groupe</option>
                                {groups?.map((g) => {
                                    return (
                                        <option value={g._id} key={g._id}>{g.groupName}</option>
                                    )
                                }
                                )}
                            </select>

                        </div>
                        <button className='button' onClick={() => handleExportGroup()}><i className="material-icons">download</i></button>
                    </div>
                    <QuotationsTable quotations={filteredDevis} />
                </div>
                <Footer />
            </>
    )
}

export default QuotationsPage