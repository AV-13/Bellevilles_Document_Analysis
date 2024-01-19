import React from 'react'
import axios from 'axios';


const Tests = () => {
  return (
    <div>
        <button onClick={async () => {

      try {
        await axios.get('http://localhost:3031/groups/getgroups')
      } catch (error) {
        console.error('Error get groups', error);
      }
        }
        
        }>
            Groups
        </button>
    </div>
  )
}

export default Tests