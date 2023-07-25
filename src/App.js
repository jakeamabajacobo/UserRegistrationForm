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
    const [profValue, setprofValue] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [professions, setProfessions] = useState([]);
    const [specialties, setSpecialties] = useState([]);
  
    //modals
    const [showModal, setShowModal] = useState(false);
    const [detailModal, setShowDetailModal] = useState(false);

    
      // Function to display modal with spinning loader for 3 seconds
      const displayModalWithLoader = () => {
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          setShowDetailModal(true);
        }, 3000); // Hide modal after 3 seconds (3000 ms)
      };

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
        .catch((error) => console.error(error));
    }, []);

   

  
    // Fetch data for "profession" dropdown from the public API
    useEffect(() => {
      fetch('/rest/refdata/professions')
        .then((response) => response.json())
        .then((data) => setProfessions(data))
        .catch((error) => console.error(error));
    }, []);
  
    // Fetch data for "specialty" dropdown based on selected profession
    useEffect(() => {
      if (profession) {
        fetch(`/rest/refdata/specialties?professionId=${profession}`)
          .then((response) => response.json())
          .then((data) => setSpecialties(data))
          .catch((error) => console.error(error));
      }
    }, [profession]);
  
    // Function to handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsLoading(true);
      displayModalWithLoader()
    };


    const handleSelectChange = (e) => {
      setProfession(e.target.value);
      setprofValue(e.target[e.target.selectedIndex].innerText);
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
                                          
                                          <select className="form-control" value={profession} onChange={(e) => handleSelectChange(e)}>
                                            <option  key="default" value="">Select Profession</option>
                                            {professions.map((profession) => (
                                              <option  key={profession.professionId}  value={profession.professionId}>{profession.professionName}</option>
                                            ))}
                                          </select>
                                          <input type="text" id="profession" name="profession" value={profValue} hidden="true"  />
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
                                              <option key={specialty.specialtyId} value={specialty.specialtyName}>{specialty.specialtyName}</option>
                                            ))}
                                          </select>
                                      </div>
                                    </div>
                                  )}

                                  <div class="text-center"  >
                                    <button type="submit" className="btn btn-default btn-lg btn_submit" disabled={isLoading}>
                                      Submit
                                    </button>
                                    
                                    <button type="button" onClick={() => window.location.reload(true)} className="btn btn-default btn-lg btn_submit btn_cancel">
                                              Cancel
                                    </button>
                                  </div>
                                </form>






     {/* loading Modal */}
     <div className={`modal ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
                {showModal ? (
                    <div class="spinner-border text-primary" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                ) : (
                  <>
                
                  </>)
                }
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop show" />}

                   
      {/* details modal */}  
      <div className={`modal ${detailModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog detail_modal" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
                  <h1>You are now Registered!</h1>


                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Prefession</th>
                        <th>Specialty</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>{firstName}</td>
                          <td>{lastName}</td>
                          <td>{email}</td>
                          <td>{country}</td>
                          <td>{profValue}</td>
                          <td>{specialty}</td>
                        </tr>
                    
                    </tbody>
                  </table>

          
                  <button type="button"  onClick={() => window.location.reload(true)} className="btn btn-default btn-lg btn_modal_close">
                        Close
                  </button>
            
            </div>
          </div>
        </div>
      </div>
      {detailModal && <div className="modal-backdrop show" />}




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