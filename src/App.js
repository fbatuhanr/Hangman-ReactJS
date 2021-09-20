import React, {useState, useEffect} from 'react';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {

  const [countries, setCountries] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(function (response) {
      // handle success
      setCountries(response.data);
    })
    .catch(function (error) {
      // handle error
      setError(error);
    })
    .then(function () {
      // always executed
    });

  }, []);


  return (
    <div className="container">
      <div className="row">
      {
        countries && countries.map(country => 
          <div className="col col-3">
            <div className="mt-1 mb-1 border">
            {country.name}
            </div>
          </div>
        )
      } 
      </div>
    </div>
  );
}

export default App;
