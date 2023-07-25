import React, { useState, useEffect } from 'react';
import bannerImage from './banner.png';

const UserRegistrationForm = () => {
  
 
    // State variables to hold form data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [profession, setProfession] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [specialties, setSpecialties] = useState([]);
  
    // Fetch data for "country" dropdown from the public API
    useEffect(() => {
      fetch('/rest/refdata/countries')
        .then((response) => {


        if (!response.ok){
          throw new Error('Network response was not ok');
          }


        return  response.json() 
        })
        .then((data) => setCountries(data))
        .catch((error) => console.error('Error fetching countries:', error));
    }, []);

   

  
    // Fetch data for "profession" dropdown from the public API
    useEffect(() => {
      fetch('/rest/refdata/professions')
        .then((response) => response.json())
        .then((data) => setProfessions(data))
        .catch((error) => console.error('Error fetching professions:', error));
    }, []);
  
    // Fetch data for "specialty" dropdown based on selected profession
    useEffect(() => {
      if (profession) {
        fetch(`/rest/refdata/specialties?professionId=${profession}`)
          .then((response) => response.json())
          .then((data) => setSpecialties(data))
          .catch((error) => console.error('Error fetching specialties:', error));
      }
    }, [profession]);
  
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      // Simulate loading for 3 seconds before displaying data
      setTimeout(() => {
        setIsLoading(false);
        alert(JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          country,
          profession,
          specialty,
        }, null, 2));
      }, 3000);
    };

  return (

    <div className="app-container">

      <img src={bannerImage} alt="Banner" className="banner-image" class="img-responsive" />
        <div class="container">
           <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">

                    <div class="container panel_parent">
                          <div class="panel panel-default">
                            <div class="panel-heading"><h1 class="text-center">Register User</h1></div>
                            <div class="panel-body">

                                <form className="container form-horizontal" onSubmit={handleSubmit}>
                              <br />
                                  <div className="form-group">
                                  <label class="control-label" for="firstName">First Name:</label><br />
                                    <div class="col-md-12">
                                      <input type="text" placeholder="Enter Firstname" className="form-control" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                    </div>
                           
                                  </div>

                                  <div className="form-group">
                                    <label class="control-label" for="lastname">Last Name:</label><br />
                                      <div class="col-md-12">
                                        <input type="text" placeholder="Enter Lastname" className="form-control" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                      </div> 
                                  </div>

                                  <div className="form-group">
                                    <label class="control-label" for="email">Email:</label>
                                      <div class="col-md-12">
                                        <input type="email" placeholder="Enter Email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                      </div>
                                  </div>

                                  <div className="form-group">
                                    <label class="control-label" for="password">Password:</label>
                                      <div class="col-md-12">
                                       <input type="password" placeholder="Enter Password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                      </div>
                                  </div>
                            
                                  <div className="form-group">
                                    <label  class="control-label" for="country">Country:</label>
                                      <div class="col-md-12">       
                                          <select className="form-control" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                                            <option  key="default" value="">Select Country</option>
                                            {countries.map((country) => (
                                              <option key={country.isoCode} value={country.isoCountry}>{country.isoCountry}</option>
                                            ))}
                                          </select>
                                      </div>
                                  </div>

                                  <div className="form-group">
                                    <label class="control-label" for="profession">Profession:</label>
                                      <div class="col-md-12">      
                                          <select className="form-control" name="profession" value={profession} onChange={(e) => setProfession(e.target.value)}>
                                            <option  key="default" value="">Select Profession</option>
                                            {professions.map((profession) => (
                                              <option  key={profession.professionId} value={profession.professionId}>{profession.professionName}</option>
                                            ))}
                                          </select>
                                      </div>
                                  </div>


                                  {profession && (
                                    <div className="form-group">
                                      <label class="control-label" for="specialty">Specialty:</label>
                                      <div class="col-md-12">    
                                          <select className="form-control" name="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                                            <option  key="default" value="">Select Specialty</option>
                                            {                                
                                            specialties.map((specialty) => (
                                              <option key={specialty.specialtyId} value={specialty.specialtyId}>{specialty.specialtyName}</option>
                                            ))}
                                          </select>
                                      </div>
                                    </div>
                                  )}


                                  <div class="text-center"  >
                                    <button type="submit" className="btn btn-default btn-lg btn_submit" disabled={isLoading}>
                                      {isLoading ? 'Submitting...' : 'Submit'}
                                    </button>
                                    
                                    <button type="button" className="btn btn-default btn-lg btn_submit btn_cancel">
                                              Cancel
                                    </button>
                                  </div>
                                </form>

                            </div>
                          </div>
                    </div>

                </div>
                <div class="col-md-1"></div>
           </div>
        </div>
    </div>
  );
};

export default UserRegistrationForm;