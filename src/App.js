import React, { useState, useEffect } from 'react';
import bannerImage from './banner.png';

const UserRegistrationForm = async () => {
  
  const [professions, setProfessions] = useState([]);
  const [profession, setProfession] = useState('');

  const rootUrl = process.env.NODE_ENV === "production" ? "https://test-services.interact.technology" : ""
   
    // fetch(`${rootUrl}/rest/refdata/professions`)
    // .then((response) => console.log(response));
          

    const res = await fetch(`https://test-services.interact.technology/rest/refdata/professions`)
   console.log(res)
  

  return (

    <><h1>test</h1>
 
    {/* <select value={profession} onChange={(e) => setProfession(e.target.value)}>
      <option  key="default" value="">Select Profession</option>
      {professions.map((profession) => (
        <option  key={profession.professionId}  value={profession.professionId}>{profession.professionName}</option>
      ))}
    </select> */}

  
    
    </>



 


  );
};

export default UserRegistrationForm;