import React, { useState, useEffect } from 'react';
import bannerImage from './banner.png';

const UserRegistrationForm = () => {
  
  
    const rootUrl = process.env.NODE_ENV === "production" ? "https://registeruser55knots.vercel.app" : ""
   
    fetch('/rest/refdata/professions')
    .then((response) => 
    
    console.log(response.json())
    );

          
  

  return (
<h1>test</h1>
  );
};

export default UserRegistrationForm;