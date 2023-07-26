import React, { useState, useEffect } from 'react';
import bannerImage from './banner.png';

const UserRegistrationForm = () => {
  
  const [professions, setProfessions] = useState([]);
  const [profession, setProfession] = useState('');

  const rootUrl = process.env.NODE_ENV === "production" ? "https://registeruser55knots.vercel.app" : ""
   


    fetch('/rest/refdata/professions')
    .then((response) => console.log(response))
    .then((data) =>console.log(data))
    .catch((error) => console.log(error));


    // fetch('/rest/refdata/professions')
    // .then((response) => response.json())
    // .then((data) => setProfessions(data))
    // .catch((error) => console.error(error));
          
  

  return (

    <><h1>test</h1>
 
    <select value={profession} onChange={(e) => setProfession(e.target.value)}>
      <option  key="default" value="">Select Profession</option>
      {professions.map((profession) => (
        <option  key={profession.professionId}  value={profession.professionId}>{profession.professionName}</option>
      ))}
    </select>

  
    
    </>



 


  );
};

export default UserRegistrationForm;