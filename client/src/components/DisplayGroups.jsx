import React, { useEffect, useState } from 'react';
import GroupTable from "./GroupTable";
import axios from 'axios';


const DisplayGroups = () => {

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState();

    
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
        fetchGroups();
      },[]);

      if (!groups?.length) return <p>Ca charge...</p>;

        return (
            <>
               <select name="groups" onChange={(e) => setSelectedGroup(e.target.value)} >
                    <option value={""} >Sélectionner un groupe</option>
                    {groups.map((g) => {
                        return(
                            <option value={g} key={g._id}>{g.groupName}</option>
                        )
                    }
                    )}
               </select>
               {selectedGroup && <GroupTable group={selectedGroup}/>}
            </>
        )
}

export default DisplayGroups